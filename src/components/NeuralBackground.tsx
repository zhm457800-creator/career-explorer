import React, { useMemo } from 'react';
import { motion } from 'motion/react';

export const NeuralBackground = () => {
  // Generate nodes in a rose-like shape
  const { nodes, connections, floatingParticles } = useMemo(() => {
    const generatedNodes: { id: number; x: number; y: number; size: number; delay: number; duration: number }[] = [];
    const numNodes = 200; // Increased for more detail
    
    for (let i = 0; i < numNodes; i++) {
      // Rose curve (rhodonea curve) logic: r = cos(k * theta)
      // We'll use multiple layers to make it look like a full rose
      const theta = Math.random() * Math.PI * 2;
      const layer = Math.floor(Math.random() * 3); // 3 layers of petals
      const k = 5 + layer * 2; // Different petal counts for layers
      
      const r_base = 180 + layer * 40; // Larger radius
      const r = r_base * Math.abs(Math.cos(k * theta / 2)) * (0.6 + Math.random() * 0.4);
      
      let x = 400 + r * Math.cos(theta);
      let y = 400 + r * Math.sin(theta);
      
      // Add some organic irregularity
      x += Math.random() * 40 - 20;
      y += Math.random() * 40 - 20;

      generatedNodes.push({
        id: i,
        x,
        y,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }

    const generatedConnections: { id: string; x1: number; y1: number; x2: number; y2: number; delay: number; duration: number }[] = [];
    
    // Connect nearby nodes to form the "petals"
    generatedNodes.forEach((node1, i) => {
      let connectionsCount = 0;
      generatedNodes.forEach((node2, j) => {
        if (i < j && connectionsCount < 2) {
          const dist = Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
          // Connect nodes that are close to each other to form the lines
          if (dist < 60 && Math.random() > 0.3) {
            generatedConnections.push({
              id: `${i}-${j}`,
              x1: node1.x,
              y1: node1.y,
              x2: node2.x,
              y2: node2.y,
              delay: Math.random() * 5,
              duration: Math.random() * 4 + 3,
            });
            connectionsCount++;
          }
        }
      });
    });

    // Add light floating particles around the rose
    const floating: { id: number; x: number; y: number; size: number; delay: number; duration: number }[] = [];
    for (let i = 0; i < 15; i++) {
      floating.push({
        id: i + 1000,
        x: Math.random() * 800,
        y: Math.random() * 800,
        size: Math.random() * 1.2 + 0.3,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 5,
      });
    }

    return { nodes: generatedNodes, connections: generatedConnections, floatingParticles: floating };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      <svg 
        viewBox="0 0 800 800" 
        className="w-[120vw] h-[120vh] md:w-[100vw] md:h-[100vh] max-w-full opacity-100"
        style={{ filter: 'drop-shadow(0 0 25px rgba(216, 167, 177, 0.9))' }}
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(216, 167, 177, 0.1)" />
            <stop offset="50%" stopColor="rgba(216, 167, 177, 1)" />
            <stop offset="100%" stopColor="rgba(216, 167, 177, 0.1)" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(216, 167, 177, 1)" />
            <stop offset="100%" stopColor="rgba(216, 167, 177, 0.2)" />
          </radialGradient>
          <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(216, 167, 177, 0)" />
          </radialGradient>
        </defs>

        {/* Floating Particles */}
        {floatingParticles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="url(#particleGlow)"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [0, -40, 0],
              x: [p.x, p.x + (Math.random() * 20 - 10), p.x]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
          />
        ))}

        {/* Connections */}
        {connections.map((conn) => {
          const cx = (conn.x1 + conn.x2) / 2 + (Math.random() * 40 - 20);
          const cy = (conn.y1 + conn.y2) / 2 + (Math.random() * 40 - 20);
          
          return (
            <motion.path
              key={conn.id}
              d={`M ${conn.x1} ${conn.y1} Q ${cx} ${cy} ${conn.x2} ${conn.y2}`}
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: conn.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: conn.delay
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size * 1.8}
            fill="url(#nodeGlow)"
            initial={{ opacity: 0.4, scale: 0.8 }}
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.5, 0.8]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay
            }}
          />
        ))}
      </svg>
    </div>
  );
};
