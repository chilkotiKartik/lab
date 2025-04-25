"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChart3, PieChart, LineChart, Maximize2, Minimize2, Download, Share2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { triggerAchievement } from "@/components/achievements-notification"
import { useToast } from "@/hooks/use-toast"

// Mock research data for visualization
const researchData = {
  categories: {
    labels: ["Spacecraft", "Drones", "Satellites", "Propulsion", "Materials", "AI & Robotics"],
    values: [35, 25, 20, 10, 5, 5],
  },
  timeline: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [12, 19, 15, 25, 22, 30],
  },
  citations: {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
    values: [10, 15, 25, 40, 60, 85],
  },
  collaborations: {
    labels: ["North America", "Europe", "Asia", "Australia", "Africa", "South America"],
    values: [45, 25, 15, 8, 5, 2],
  },
}

export default function VisualizeResearchPage() {
  const { user, addAchievement, hasAchievement } = useAuth()
  const { toast } = useToast()
  const [chartType, setChartType] = useState<"bar" | "pie" | "line">("bar")
  const [dataSet, setDataSet] = useState<"categories" | "timeline" | "citations" | "collaborations">("categories")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  // Check if user has viewed the visualization page
  useEffect(() => {
    if (user && !hasAchievement("view_visualization")) {
      // Add a small delay to make it feel more natural
      setTimeout(() => {
        addAchievement("view_visualization", "Data Explorer", "View research data visualizations", 10)
        triggerAchievement("Data Explorer", "You've unlocked the visualization tools", 10)
      }, 2000)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [user, addAchievement, hasAchievement])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Handle chart type or dataset change
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [chartType, dataSet])

  // Get current dataset
  const currentData = researchData[dataSet]

  // Handle download
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${dataSet} data as CSV file.`,
    })
  }

  // Handle share
  const handleShare = () => {
    toast({
      title: "Share Link Created",
      description: "Visualization link copied to clipboard.",
    })
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Link href="/research">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Research
                </Button>
              </Link>
            </div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold font-space mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Research <span className="cosmic-gradient">Visualization</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explore and analyze research data through interactive visualizations.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-1">
            <CardHeader>
              <CardTitle>Visualization Controls</CardTitle>
              <CardDescription>Select data and chart type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Set</label>
                <Select value={dataSet} onValueChange={(value: any) => setDataSet(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="categories">Research Categories</SelectItem>
                    <SelectItem value="timeline">Publication Timeline</SelectItem>
                    <SelectItem value="citations">Citation Growth</SelectItem>
                    <SelectItem value="collaborations">Global Collaborations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Chart Type</label>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant={chartType === "bar" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" /> Bar Chart
                  </Button>
                  <Button
                    variant={chartType === "pie" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChart className="h-4 w-4 mr-2" /> Pie Chart
                  </Button>
                  <Button
                    variant={chartType === "line" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setChartType("line")}
                  >
                    <LineChart className="h-4 w-4 mr-2" /> Line Chart
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <Button variant="outline" className="w-full justify-center" onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-4 w-4 mr-2" /> Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4 mr-2" /> Fullscreen
                    </>
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="w-full justify-center" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>

                  <Button variant="outline" className="w-full justify-center" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {dataSet === "categories" && "Research Categories Distribution"}
                {dataSet === "timeline" && "Publication Timeline"}
                {dataSet === "citations" && "Citation Growth Over Time"}
                {dataSet === "collaborations" && "Global Research Collaborations"}
              </CardTitle>
              <CardDescription>
                {dataSet === "categories" && "Distribution of research papers across different categories"}
                {dataSet === "timeline" && "Number of publications over the last 6 months"}
                {dataSet === "citations" && "Growth in research citations from 2018 to 2023"}
                {dataSet === "collaborations" && "Geographic distribution of research collaborations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={chartRef} className="h-[400px] w-full flex items-center justify-center relative">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-sm text-muted-foreground">Loading visualization data...</p>
                  </div>
                ) : (
                  <div className="text-center w-full">
                    {/* Simplified chart visualization */}
                    <div className="flex items-end justify-center h-64 gap-2 mt-8">
                      {chartType === "bar" &&
                        currentData.labels.map((label, index) => (
                          <div key={label} className="flex flex-col items-center">
                            <motion.div
                              className="w-12 bg-primary/80 rounded-t-md flex flex-col items-center"
                              style={{
                                height: `${(currentData.values[index] / Math.max(...currentData.values)) * 100}%`,
                              }}
                              initial={{ height: 0 }}
                              animate={{
                                height: `${(currentData.values[index] / Math.max(...currentData.values)) * 100}%`,
                              }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "hsl(var(--primary))",
                                transition: { duration: 0.2 },
                              }}
                            >
                              <motion.span
                                className="text-xs font-medium mt-2 text-primary-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                              >
                                {currentData.values[index]}
                              </motion.span>
                            </motion.div>
                            <motion.span
                              className="text-xs mt-2 whitespace-nowrap"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                            >
                              {label}
                            </motion.span>
                          </div>
                        ))}

                      {chartType === "pie" && (
                        <motion.div
                          className="relative w-64 h-64"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          {currentData.labels.map((label, index) => {
                            const total = currentData.values.reduce((a, b) => a + b, 0)
                            const percentage = (currentData.values[index] / total) * 100
                            const colors = [
                              "bg-primary",
                              "bg-secondary",
                              "bg-blue-500",
                              "bg-green-500",
                              "bg-yellow-500",
                              "bg-purple-500",
                            ]

                            return (
                              <motion.div
                                key={label}
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                              >
                                <div
                                  className={`${colors[index % colors.length]} h-full w-full absolute`}
                                  style={{
                                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(percentage * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin(percentage * 0.01 * Math.PI * 2)}%, 50% 0%)`,
                                    transform: `rotate(${index * 36}deg)`,
                                  }}
                                />
                                <motion.div
                                  className="absolute text-xs font-medium text-white"
                                  style={{
                                    left: `${50 + 35 * Math.cos(((index * 36 + percentage / 2) * Math.PI) / 180)}%`,
                                    top: `${50 - 35 * Math.sin(((index * 36 + percentage / 2) * Math.PI) / 180)}%`,
                                  }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1 + index * 0.1 }}
                                >
                                  {percentage.toFixed(0)}%
                                </motion.div>
                              </motion.div>
                            )
                          })}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className="bg-card rounded-full w-32 h-32 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              <span className="text-sm font-medium">
                                {dataSet.charAt(0).toUpperCase() + dataSet.slice(1)}
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {chartType === "line" && (
                        <div className="relative w-full h-64 flex items-end">
                          <svg className="w-full h-full" viewBox="0 0 600 200">
                            {/* X and Y axes */}
                            <motion.line
                              x1="50"
                              y1="180"
                              x2="550"
                              y2="180"
                              stroke="currentColor"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5 }}
                            />
                            <motion.line
                              x1="50"
                              y1="20"
                              x2="50"
                              y2="180"
                              stroke="currentColor"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5 }}
                            />

                            {/* Line chart */}
                            <motion.path
                              d={`M ${currentData.labels
                                .map((_, i) => {
                                  const x = 50 + i * (500 / (currentData.labels.length - 1))
                                  const y = 180 - (currentData.values[i] / Math.max(...currentData.values)) * 160
                                  return `${x},${y}`
                                })
                                .join(" L ")}`}
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="3"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5 }}
                            />

                            {/* Area under the line */}
                            <motion.path
                              d={`M ${currentData.labels
                                .map((_, i) => {
                                  const x = 50 + i * (500 / (currentData.labels.length - 1))
                                  const y = 180 - (currentData.values[i] / Math.max(...currentData.values)) * 160
                                  return `${x},${y}`
                                })
                                .join(" L ")} L 550,180 L 50,180 Z`}
                              fill="hsl(var(--primary) / 0.1)"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1.5 }}
                            />

                            {/* Data points */}
                            {currentData.labels.map((label, i) => {
                              const x = 50 + i * (500 / (currentData.labels.length - 1))
                              const y = 180 - (currentData.values[i] / Math.max(...currentData.values)) * 160

                              return (
                                <motion.g key={label}>
                                  <motion.circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="hsl(var(--primary))"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                                    whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                                  />
                                  <text x={x} y="195" textAnchor="middle" fontSize="12" fill="currentColor">
                                    {label}
                                  </text>
                                  <motion.text
                                    x={x}
                                    y={y - 10}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="currentColor"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.8 + i * 0.1 }}
                                  >
                                    {currentData.values[i]}
                                  </motion.text>
                                </motion.g>
                              )
                            })}
                          </svg>
                        </div>
                      )}
                    </div>

                    <motion.div
                      className="mt-12 text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      <p>Interactive visualization of {dataSet} data</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">•</span>
                    <span className="text-sm">
                      {dataSet === "categories" && "Spacecraft design represents the largest research category at 35%"}
                      {dataSet === "timeline" && "Research publications have increased by 150% over the past 6 months"}
                      {dataSet === "citations" && "Citation growth has accelerated significantly since 2021"}
                      {dataSet === "collaborations" && "North American institutions lead collaborations at 45%"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">•</span>
                    <span className="text-sm">
                      {dataSet === "categories" && "AI & Robotics is the fastest growing research category"}
                      {dataSet === "timeline" && "June saw the highest number of publications with 30 papers"}
                      {dataSet === "citations" && "Average citations per paper increased from 5 to 12"}
                      {dataSet === "collaborations" && "European partnerships have grown by 30% in the last year"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {dataSet === "categories" && "Emerging focus areas show a shift toward AI integration in aerospace."}
                  {dataSet === "timeline" && "Publication frequency shows consistent growth with seasonal variations."}
                  {dataSet === "citations" && "Exponential citation growth indicates increasing research impact."}
                  {dataSet === "collaborations" &&
                    "Geographic distribution reveals opportunities for expansion in Asia and Africa."}
                </p>
                <div className="flex items-center">
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ delay: 0.6, duration: 1 }}
                    />
                  </div>
                  <span className="ml-2 text-xs font-medium">65%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Confidence level</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">1</span>
                    <span className="text-sm">
                      {dataSet === "categories" && "Increase investment in AI & Robotics research"}
                      {dataSet === "timeline" && "Maintain publication momentum through Q3"}
                      {dataSet === "citations" && "Focus on high-impact research areas"}
                      {dataSet === "collaborations" && "Develop more partnerships in Asia"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 text-primary p-1 rounded-full mr-2 mt-0.5">2</span>
                    <span className="text-sm">
                      {dataSet === "categories" && "Balance portfolio with more materials science research"}
                      {dataSet === "timeline" && "Address April publication dip with targeted incentives"}
                      {dataSet === "citations" && "Implement citation growth strategies for newer papers"}
                      {dataSet === "collaborations" && "Establish research exchange programs with African institutions"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
