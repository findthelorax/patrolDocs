import React from 'react';
import ImageMapper from 'react-image-mapper';

const MAP = {
    name: "my-map",
    areas: [
        { name: "Lift 1", shape: "rect", coords: [50, 50, 100, 100], href: "#lift1" },
        // ... more areas
    ]
};

function MountainMap() {
    return (
        <ImageMapper 
            src="path/to/your/image.jpg" 
            map={MAP} 
            width={500} 
            onClick={area => console.log(area.name)} 
        />
    );
}

export default MountainMap;