import ProjectCard from "@/components/Project/projectCard";


function Projects() {
    return (
        <>
            <ProjectCard
                title="DriveWise"
                description="A Python Web Application that uses Django, Flask, TensorFlow, Scikit-learn, OpenCV, and Yolo to detect driver drowsiness."
                image="/drivewise/logo.png"
                tags={['AI', 'Computer Vision', 'Drowsiness Detection']}
                overview="This project uses Django, Flask, TensorFlow, Scikit-learn, OpenCV, and Yolo to detect driver drowsiness. The application is a RESTful API that takes an image as an input and returns the detected driver drowsiness as an output."
                tools={['Django', 'Flask', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'Yolo', 'Python']}
                links={[
                    { name: 'GitHub', url: 'https://github.com/MoKenawy/DriveWise-Driving-Station' },
                ]}
                images={['/drivewise/Dashboard-2.png', '/drivewise/Driver-details.png', '/drivewise/Driver-Details-2.png']} />

            <ProjectCard
                title="Egyptian Currency Recognition"
                description="Detect and recognize Egyptian banknote denominations."
                image="egyptian-banknote/Currency-Detection-Documetnation.jpg"
                tags={['AI', 'Computer Vision', 'Egyptian Banknote Recognition']}
                overview="This project uses OpenCV, DataGradients, YOLO, and Roboflow to detect and recognize Egyptian banknote denominations. The application takes an image as an input and returns the detected banknote denomination as an output."
                tools={['OpenCV', 'YOLO', 'Roboflow', 'DataGradients']} 
                links={[
                    { name: 'Deployment Link', url: 'https://universe.roboflow.com/gradproj/eg-currency-detector/' },
                ]} />

            <ProjectCard
                title="Rental Contracts Expert System"
                description="A CLIPS Expert System to assist civilians in creating rental contracts that comply with Egyptian legal requirements."
                image="/rental-contracts-expert-system.jpg"
                tags={['CLIPS', 'Expert System', 'Legal', 'Rental Contracts']}
                overview="Developed an expert system to assist civilians in creating rental contracts that comply with Egyptian legal requirements. Implemented using CLIPS for rule-based reasoning and knowledge representation."
                tools={['CLIPS']}
                links={[
                    { name: 'GitHub', url: 'https://github.com/MoKenawy/Rental-Contracts-Expert-System/' },
                ]} />

            <ProjectCard
                title="Face Detection using OpenCV"
                description="A Web Application that uses OpenCV.js to detect faces in images."
                image="/face-detection.jpg"
                tags={['OpenCV', 'Face Detection', 'WebApp']}
                overview="This project uses OpenCV.js to detect faces in images. The application takes an image as an input and returns the detected faces as an output."
                tools={['OpenCV.js', 'JavaScript', 'HTML', 'CSS']} />
        </>
    )

}
export default Projects;