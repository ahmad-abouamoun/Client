import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import "./Model.css";

const Model = () => {
    const canvasRef = useRef(null);
    const [trainingData, setTrainingData] = useState("");
    const [show, setShow] = useState(false);
    const muscleMap = useRef({});
    const modelRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(1, 2, 5);
        camera.lookAt(0.5, 1, 0.5);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight("white");
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight("white", 1.5);
        pointLight1.position.set(-6, 5, 0);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight("white", 1.5);
        pointLight2.position.set(6, 5, 0);
        scene.add(pointLight2);

        const loader = new GLTFLoader();
        loader.load(
            "./BalanceBeamModel.glb",
            (gltf) => {
                const loadedModel = gltf.scene;
                loadedModel.scale.set(0.2, 0.2, 0.2);
                loadedModel.position.set(0, 0, 0);
                loadedModel.rotation.set(0, Math.PI, 0);
                loadedModel.traverse((child) => {
                    if (child.isMesh) {
                        muscleMap.current[child.name] = child;
                    }
                });
                scene.add(loadedModel);
                modelRef.current = loadedModel;
            },
            undefined,
            (error) => {
                console.error("Error loading the model:", error);
            }
        );

        const animate = () => {
            requestAnimationFrame(animate);
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.005;
            }
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            renderer.dispose();
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    const updateMuscleColors = (cleanData) => {
        Object.entries(cleanData).forEach(([muscleName, intensity]) => {
            const muscle = muscleMap.current[muscleName];
            if (muscle && muscle.material) {
                const material = muscle.material.clone();

                if (intensity === 0) {
                    material.color.set(0xffffff);
                } else if (intensity >= 1 && intensity <= 4) {
                    material.color.set(0x00ff00);
                } else if (intensity >= 5 && intensity <= 7) {
                    material.color.set(0xffff00);
                } else if (intensity >= 8 && intensity <= 10) {
                    material.color.set(0xff0000);
                } else {
                    material.color.set(0xffffff);
                }

                muscle.material = material;
                muscle.material.needsUpdate = true;
            }
        });
    };

    const handleTrainingSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/model", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({trainingData}),
            });

            if (!response.ok) {
                throw new Error(await response.json());
            }

            const intensityData = await response.json();
            const cleanData = JSON.parse(intensityData);
            updateMuscleColors(cleanData);
        } catch (error) {
            console.error("Error fetching intensity data:", error);
        }
    };

    return (
        <div className="canvas-container">
            <h1>3D Model</h1>
            <div className="Model">
                <div ref={canvasRef}> </div>
                <button
                    onClick={() => {
                        setShow(!show);
                    }}
                >
                    Provide Workout
                </button>

                <ul>
                    <li className="green">
                        <div></div> Low Intensity
                    </li>
                    <li className="yellow">
                        <div></div>Medium Intensity
                    </li>
                    <li className="red">
                        <div></div> High Intensity
                    </li>
                </ul>
                {show && (
                    <div className="controls">
                        <form onSubmit={handleTrainingSubmit}>
                            <label>
                                Enter Your Training Data:
                                <textarea
                                    className="textarea"
                                    value={trainingData}
                                    onChange={(e) => setTrainingData(e.target.value)}
                                    placeholder="Example: Squats: 3 sets, Bench Press: 4 sets"
                                    rows={5}
                                    cols={50}
                                />
                            </label>
                            <button type="submit">Apply Training</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Model;
