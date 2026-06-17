import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, RotateCw, Move } from "lucide-react";

export default function ThreeDSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1a1a, 0.015);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer with antialiasing & shadow support
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 4. Create the luxury faceted gemstone geometry (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(2.2, 1); // Faceted jewel look
    const wireframeGeometry = new THREE.IcosahedronGeometry(2.24, 1); // Outer wireframe cage

    // Materials
    // Elegant luxury champagne gold look with high metalness & roughness for shine
    const crystalMaterial = new THREE.MeshStandardMaterial({
      color: 0xa68d7a, // Signature champagne gold
      metalness: 0.95,
      roughness: 0.12,
      flatShading: true, // Show gorgeous geometric facets
      transparent: true,
      opacity: 0.88,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xfdfcfb, // Light luxury ivory
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const jewelMesh = new THREE.Mesh(geometry, crystalMaterial);
    const wireMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);

    const group = new THREE.Group();
    group.add(jewelMesh);
    group.add(wireMesh);
    scene.add(group);

    // Floating particles (dust of gems)
    const particlesCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xa68d7a, // Champagne bronze particles
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xfdfcfb, 0.45);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const goldPointLight = new THREE.PointLight(0x5a5a40, 1.8, 10); // Olive gold point light for rich reflections
    goldPointLight.position.set(-3, -3, 2);
    scene.add(goldPointLight);

    const tealPointLight = new THREE.PointLight(0xa68d7a, 1.2, 10); // Warm bronze secondary light source
    tealPointLight.position.set(3, -2, -2);
    scene.add(tealPointLight);

    // 6. Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let scrollY = 0;
    let targetScale = 1;
    let targetRotationSpeed = 0.005;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    // Scroll trigger handler
    const handleScroll = () => {
      scrollY = window.scrollY;
      targetScale = 1 + scrollY * 0.0008;
      targetRotationSpeed = 0.005 + scrollY * 0.00003;
    };

    currentMount.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Initial scale and trigger loading finished
    setLoading(false);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse targets for floaty jewel movement
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base rotations modulated by mouse
      group.rotation.y = elapsedTime * 0.25 + targetX * 1.5;
      group.rotation.x = elapsedTime * 0.15 + targetY * 1.0;

      // Outer wireframe rotates opposite for complex gemstone parallax
      wireMesh.rotation.y = -elapsedTime * 0.12;
      wireMesh.rotation.z = elapsedTime * 0.08;

      // Scale pulse on hover or scroll
      const scaleLerp = (isHovered ? 1.15 : 1.0) * targetScale;
      group.scale.x += (scaleLerp - group.scale.x) * 0.1;
      group.scale.y += (scaleLerp - group.scale.y) * 0.1;
      group.scale.z += (scaleLerp - group.scale.z) * 0.1;

      // Slowly float particles
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      currentMount.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      wireframeGeometry.dispose();
      crystalMaterial.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isHovered]);

  return (
    <div className="relative w-full overflow-hidden bg-forest-900 border-y border-gold-450/20 py-24 px-4">
      {/* Absolute backgrounds with subtle lights */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-forest-900 to-forest-950 -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Typography description */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-white" id="three-d-text-section">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-300/30 rounded-full w-fit">
            <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-gold-200">Interactive 3D Craft Preview</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-gold-100">
            A New Dimension <br />
            <span className="italic text-gold-300">of Metal & Stone</span>
          </h2>
          
          <p className="text-sm md:text-base text-gold-100/80 leading-relaxed font-sans">
            Alexandra Bates Jewellery translates the rich, wild geography of the Canadian Kootenays into exquisite miniature sculptures. 
            Experience our virtual gemstone model—interactive and hand-calibrated. 
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold-300/20">
            <div className="flex items-start gap-2.5">
              <Move className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-serif font-semibold text-gold-100">Mouse Gravity</h4>
                <p className="text-[11px] text-gold-100/60 font-sans">Move your cursor to warp light and perspective.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <RotateCw className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-serif font-semibold text-gold-100">Scroll Wave</h4>
                <p className="text-[11px] text-gold-100/60 font-sans">Scrolling activates natural compression & expansion.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-gold-300/70 pt-2">
            <Eye className="w-4 h-4" />
            <span>Cast in Recycled Sterling Silver & 18k Yellow Gold</span>
          </div>
        </div>

        {/* Right Side: Interactive 3D Canvas Box */}
        <div className="lg:col-span-7 relative h-[450px] md:h-[500px] w-full bg-forest-950/40 rounded-2xl border border-gold-300/15 overflow-hidden group">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest-950/90 z-20 space-y-3">
              <div className="w-8 h-8 border-2 border-gold-450 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono text-gold-200">Heating the smelting crucible...</p>
            </div>
          )}

          {/* Interactive Floating Hover Hint Badge */}
          <div className="absolute top-4 right-4 bg-forest-900/80 border border-gold-300/20 backdrop-blur-md text-gold-200 text-[10px] font-mono px-2.5 py-1 rounded-full pointer-events-none z-10 select-none uppercase tracking-widest flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-450 animate-ping" />
            Hover & Scroll
          </div>

          <div
            id="three-d-canvas-container"
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Beautiful subtle gold metallic edge details */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-gold-300/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gold-300/20 to-transparent pointer-events-none" />
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-300/20 to-transparent pointer-events-none" />
          <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-300/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
