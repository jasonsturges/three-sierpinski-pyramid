import * as THREE from 'three';

class SierpinskiPyramidGeometry extends THREE.BufferGeometry {
  constructor(level = 1, size = 1) {
    super();

    // Helper function to generate vertices for a tetrahedron
    const createTetrahedronVertices = (center, size) => {
      const vertices = [];

      // Define the vertices of the tetrahedron relative to the center
      const sqrt2over3 = Math.sqrt(2) / 3;
      const a = size / Math.sqrt(2);

      vertices.push(
        center.x, center.y + a, center.z, // Top vertex
        center.x - a / 2, center.y - sqrt2over3 * a, center.z + a / 2, // Front-left vertex
        center.x + a / 2, center.y - sqrt2over3 * a, center.z + a / 2, // Front-right vertex
        center.x, center.y - sqrt2over3 * a, center.z - a // Back vertex
      );

      return vertices;
    };

    const addPyramid = (vertices, center, size, level) => {
      if (level === 0) {
        // Add vertices for the current tetrahedron
        vertices.push(...createTetrahedronVertices(center, size));
      } else {
        const newSize = size / 2;
        const offset = newSize / Math.sqrt(2);

        // Define centers for the 4 new smaller tetrahedra
        const centers = [
          new THREE.Vector3(center.x, center.y + offset, center.z), // Top
          new THREE.Vector3(center.x - newSize / 2, center.y - offset, center.z + newSize / 2), // Front-left
          new THREE.Vector3(center.x + newSize / 2, center.y - offset, center.z + newSize / 2), // Front-right
          new THREE.Vector3(center.x, center.y - offset, center.z - newSize) // Back
        ];

        // Recursively add smaller pyramids
        for (let i = 0; i < centers.length; i++) {
          addPyramid(vertices, centers[i], newSize, level - 1);
        }
      }
    };

    // Start with an empty array for vertices
    const vertices = [];
    addPyramid(vertices, new THREE.Vector3(0, 0, 0), size, level);

    // Create position attribute for BufferGeometry
    const positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    this.setAttribute('position', positionAttribute);

    this.computeVertexNormals();
  }
}

export { SierpinskiPyramidGeometry };
