/**
 * Lightweight Hyperspeed background inspired by the React component signature provided by the user.
 * This version uses Three.js and focuses on delivering a performant animated backdrop that respects
 * the same option structure (road colors, lights, speed-up effect, etc).
 */
(function(global) {
    const DEFAULT_OPTIONS = {
        distortion: 'turbulentDistortion',
        length: 400,
        roadWidth: 10,
        islandWidth: 2,
        lanesPerRoad: 4,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 20,
        lightPairsPerRoadWay: 40,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.03, 400 * 0.2],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.8, 0.8],
        carFloorSeparation: [0, 5],
        colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xffffff,
            brokenLines: 0xffffff,
            leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
            rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
            sticks: 0x03b3c3
        },
        onSpeedUp: () => {},
        onSlowDown: () => {}
    };

    const toRange = (value, min, max) => value * (max - min) + min;

    class HyperspeedBackground {
        constructor(canvas, options = {}) {
            if (!global.THREE) {
                throw new Error('Three.js is required for HyperspeedBackground. Make sure the CDN is loaded.');
            }
            this.canvas = canvas;
            this.options = mergeOptions(DEFAULT_OPTIONS, options);
            this.renderer = new global.THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true
            });
            this.scene = new global.THREE.Scene();
            this.scene.background = new global.THREE.Color(this.options.colors.background);
            this.clock = new global.THREE.Clock();
            this.camera = new global.THREE.PerspectiveCamera(
                this.options.fov,
                1,
                0.1,
                this.options.length * 2
            );
            this.camera.position.set(0, 5, 10);
            this.camera.lookAt(0, 0, -10);
            this.speedTarget = 1;
            this.speedCurrent = 1;
            this.lightCollections = [];
            this.resizeHandler = this.handleResize.bind(this);
            this.pointerDownHandler = this.handlePointerDown.bind(this);
            this.pointerUpHandler = this.handlePointerUp.bind(this);
            this.isRunning = false;
            this.setupScene();
            this.handleResize();
        }

        setupScene() {
            const THREE = global.THREE;
            const roadGeo = new THREE.PlaneGeometry(this.options.roadWidth, this.options.length, 1, 10);
            const roadMat = new THREE.MeshBasicMaterial({
                color: this.options.colors.roadColor,
                side: THREE.DoubleSide
            });
            const road = new THREE.Mesh(roadGeo, roadMat);
            road.rotation.x = -Math.PI / 2;
            this.scene.add(road);

            const islandGeo = new THREE.PlaneGeometry(this.options.islandWidth, this.options.length, 1, 10);
            const islandMat = new THREE.MeshBasicMaterial({
                color: this.options.colors.islandColor,
                side: THREE.DoubleSide
            });
            const island = new THREE.Mesh(islandGeo, islandMat);
            island.position.y = 0.01;
            island.rotation.x = -Math.PI / 2;
            this.scene.add(island);

            this.createLaneLines();
            this.createShoulderLines();
            this.createSticks();
            this.createCarLights();
        }

        createLaneLines() {
            const THREE = global.THREE;
            const group = new THREE.Group();
            const segments = 30;
            const segmentLength = (this.options.length / segments) * this.options.brokenLinesLengthPercentage;
            const mat = new THREE.MeshBasicMaterial({
                color: this.options.colors.brokenLines,
                transparent: true,
                opacity: 0.8
            });
            const width = this.options.brokenLinesWidthPercentage * this.options.roadWidth;
            for (let lane = -this.options.lanesPerRoad; lane <= this.options.lanesPerRoad; lane++) {
                const x = (lane / this.options.lanesPerRoad) * (this.options.roadWidth / 2);
                for (let i = 0; i < segments; i++) {
                    const geo = new THREE.PlaneGeometry(width, segmentLength);
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.position.set(x, 0.02, -this.options.length / 2 + i * (this.options.length / segments));
                    mesh.rotation.x = -Math.PI / 2;
                    group.add(mesh);
                }
            }
            this.scene.add(group);
        }

        createShoulderLines() {
            const THREE = global.THREE;
            const width = this.options.shoulderLinesWidthPercentage * this.options.roadWidth;
            const geo = new THREE.PlaneGeometry(width, this.options.length);
            const mat = new THREE.MeshBasicMaterial({ color: this.options.colors.shoulderLines, side: THREE.DoubleSide });

            const left = new THREE.Mesh(geo, mat);
            left.rotation.x = -Math.PI / 2;
            left.position.set(-this.options.roadWidth / 2 + width / 2, 0.015, 0);
            const right = left.clone();
            right.position.x = this.options.roadWidth / 2 - width / 2;

            this.scene.add(left, right);
        }

        createSticks() {
            const THREE = global.THREE;
            const total = this.options.totalSideLightSticks * 2;
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({
                color: this.options.colors.sticks,
                transparent: true,
                opacity: 0.8
            });
            const instanced = new THREE.InstancedMesh(geometry, material, total);
            this.scene.add(instanced);
            const data = [];
            const dummy = new THREE.Object3D();
            for (let i = 0; i < total; i++) {
                const side = i % 2 === 0 ? -1 : 1;
                const width = randomBetween(this.options.lightStickWidth);
                const height = randomBetween(this.options.lightStickHeight);
                const z = Math.random() * this.options.length - this.options.length / 2;
                const x = side * (this.options.roadWidth / 2 + 1);
                data.push({
                    speed: side === -1 ? randomBetween(this.options.movingCloserSpeed) : randomBetween(this.options.movingAwaySpeed),
                    x,
                    y: height / 2,
                    z,
                    width,
                    height,
                    depth: width * 0.5
                });
                dummy.position.set(x, height / 2, z);
                dummy.scale.set(width, height, width * 0.5);
                dummy.updateMatrix();
                instanced.setMatrixAt(i, dummy.matrix);
            }
            instanced.instanceMatrix.needsUpdate = true;
            this.lightCollections.push({ mesh: instanced, data });
        }

        createCarLights() {
            const leftLights = this.makeLightPairs(this.options.lightPairsPerRoadWay, this.options.colors.leftCars, 1);
            const rightLights = this.makeLightPairs(this.options.lightPairsPerRoadWay, this.options.colors.rightCars, -1);
            this.lightCollections.push(leftLights, rightLights);
        }

        makeLightPairs(count, palette, direction) {
            const THREE = global.THREE;
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({
                color: palette[0],
                transparent: true,
                opacity: this.options.carLightsFade
            });
            const instanced = new THREE.InstancedMesh(geometry, material, count);
            instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            instanced.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
            const dummy = new THREE.Object3D();
            const color = new THREE.Color();
            const data = [];
            for (let i = 0; i < count; i++) {
                const isLeft = direction > 0;
                const laneShift = randomBetween(this.options.carShiftX);
                const x =
                    (isLeft ? -1 : 1) * (this.options.islandWidth / 2 + (this.options.roadWidth / 4)) +
                    laneShift;
                const length = randomBetween(this.options.carLightsLength);
                const width = randomBetween(this.options.carWidthPercentage) * 0.6;
                const height = 0.2;
                const z = Math.random() * this.options.length - this.options.length / 2;
                const y = randomBetween(this.options.carFloorSeparation) * 0.01 + 0.15;
                const speedRange = isLeft ? this.options.movingAwaySpeed : this.options.movingCloserSpeed;
                const speed = randomBetween(speedRange);
                data.push({ x, y, z, width, height, length, speed });
                dummy.position.set(x, y, z);
                dummy.scale.set(width, height, length);
                dummy.updateMatrix();
                instanced.setMatrixAt(i, dummy.matrix);
                const paletteColor = palette[Math.floor(Math.random() * palette.length)];
                color.setHex(paletteColor);
                instanced.setColorAt(i, color);
            }
            instanced.instanceMatrix.needsUpdate = true;
            instanced.instanceColor.needsUpdate = true;
            this.scene.add(instanced);
            return { mesh: instanced, data };
        }

        handleResize() {
            const width = this.canvas.clientWidth || this.canvas.parentElement.clientWidth || window.innerWidth;
            const height = this.canvas.clientHeight || this.canvas.parentElement.clientHeight || window.innerHeight;
            this.renderer.setPixelRatio(global.devicePixelRatio || 1);
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }

        handlePointerDown() {
            this.speedTarget = this.options.speedUp;
            if (typeof this.options.onSpeedUp === 'function') {
                this.options.onSpeedUp();
            }
        }

        handlePointerUp() {
            this.speedTarget = 1;
            if (typeof this.options.onSlowDown === 'function') {
                this.options.onSlowDown();
            }
        }

        update(delta) {
            const THREE = global.THREE;
            this.speedCurrent += (this.speedTarget - this.speedCurrent) * 0.02;
            this.camera.fov += (this.speedTarget === 1 ? this.options.fov : this.options.fovSpeedUp) - this.camera.fov;
            this.camera.updateProjectionMatrix();
            const dummy = new THREE.Object3D();
            this.lightCollections.forEach(collection => {
                collection.data.forEach((item, index) => {
                    item.z += (item.speed || this.options.movingAwaySpeed[0]) * delta * this.speedCurrent * 0.5;
                    if (item.z > this.options.length / 2) item.z = -this.options.length / 2;
                    if (item.z < -this.options.length / 2) item.z = this.options.length / 2;
                    dummy.position.set(item.x, item.y, item.z);
                    dummy.scale.set(item.width, item.height, item.length || item.depth || 1);
                    dummy.updateMatrix();
                    collection.mesh.setMatrixAt(index, dummy.matrix);
                });
                collection.mesh.instanceMatrix.needsUpdate = true;
            });
        }

        animate() {
            if (!this.isRunning) return;
            const delta = this.clock.getDelta();
            this.update(delta);
            this.renderer.render(this.scene, this.camera);
            this.rafId = global.requestAnimationFrame(this.animate.bind(this));
        }

        start() {
            if (this.isRunning) return;
            this.isRunning = true;
            global.addEventListener('resize', this.resizeHandler);
            global.addEventListener('pointerdown', this.pointerDownHandler);
            global.addEventListener('pointerup', this.pointerUpHandler);
            this.clock.start();
            this.animate();
        }

        stop() {
            this.isRunning = false;
            global.cancelAnimationFrame(this.rafId);
            global.removeEventListener('resize', this.resizeHandler);
            global.removeEventListener('pointerdown', this.pointerDownHandler);
            global.removeEventListener('pointerup', this.pointerUpHandler);
        }
    }

    function mergeOptions(base, overrides) {
        const merged = { ...base, ...overrides };
        merged.colors = { ...base.colors, ...(overrides.colors || {}) };
        return merged;
    }

    function randomBetween(range) {
        if (Array.isArray(range)) {
            const [min, max] = range;
            return toRange(Math.random(), min, max);
        }
        return range;
    }

    global.HyperspeedBackground = HyperspeedBackground;
})(window);

