"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ResearchVisualizationProps {
  data: {
    id: string
    title: string
    category: string
    value: number
    connections: string[]
  }[]
}

export function ResearchVisualization({ data }: ResearchVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !data.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        canvas.width = width
        canvas.height = height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create nodes
    const nodes = data.map((item, index) => {
      // Calculate position in a circular layout
      const angle = (index / data.length) * Math.PI * 2
      const radius = Math.min(canvas.width, canvas.height) * 0.35

      return {
        id: item.id,
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        radius: 10 + item.value / 10,
        color: getCategoryColor(item.category),
        title: item.title,
        category: item.category,
        connections: item.connections,
        velocity: { x: 0, y: 0 },
      }
    })

    // Animation loop
    let animationFrameId: number
    let hoverNode: any = null

    const render = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.3

      nodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const connectedNode = nodes.find((n) => n.id === connId)
          if (connectedNode) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.strokeStyle = node === hoverNode || connectedNode === hoverNode ? "#ffffff" : "#888888"
            ctx.stroke()
          }
        })
      })

      ctx.globalAlpha = 1

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node === hoverNode ? "#ffffff" : node.color
        ctx.fill()

        // Draw border for hovered node
        if (node === hoverNode) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2)
          ctx.strokeStyle = node.color
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw title for hovered node
          ctx.font = "14px Arial"
          ctx.fillStyle = "#ffffff"
          ctx.textAlign = "center"
          ctx.fillText(node.title, node.x, node.y + node.radius + 20)
        }
      })

      // Update node positions with slight movement
      nodes.forEach((node) => {
        node.velocity.x = node.velocity.x * 0.98 + (Math.random() - 0.5) * 0.3
        node.velocity.y = node.velocity.y * 0.98 + (Math.random() - 0.5) * 0.3

        node.x += node.velocity.x
        node.y += node.velocity.y

        // Keep nodes within bounds
        if (node.x < node.radius) node.x = node.radius
        if (node.x > canvas.width - node.radius) node.x = canvas.width - node.radius
        if (node.y < node.radius) node.y = node.radius
        if (node.y > canvas.height - node.radius) node.y = canvas.height - node.radius
      })

      animationFrameId = requestAnimationFrame(render)
    }

    // Handle mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Check if mouse is over any node
      hoverNode = null
      for (const node of nodes) {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < node.radius) {
          hoverNode = node
          break
        }
      }

      // Change cursor style
      canvas.style.cursor = hoverNode ? "pointer" : "default"
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Start animation
    render()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [data])

  // Helper function to get color based on category
  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      spacecraft: "#4c72b0",
      drones: "#dd8452",
      satellites: "#55a868",
      quantum: "#c44e52",
      materials: "#8172b3",
      default: "#937860",
    }

    return colors[category] || colors.default
  }

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[400px] bg-black/30 backdrop-blur-sm rounded-xl border border-border overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
