"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, MoreVertical, Trash2, Settings, ExternalLink, Play } from "lucide-react"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Main e-commerce application testing",
      status: "active",
      testsRun: 324,
      defectsFound: 12,
      coverage: 92,
      lastRun: "2 hours ago",
      environments: ["Chrome", "Safari", "Firefox"],
    },
    {
      id: 2,
      name: "Mobile App",
      description: "iOS and Android app testing",
      status: "active",
      testsRun: 187,
      defectsFound: 8,
      coverage: 85,
      lastRun: "1 hour ago",
      environments: ["iOS", "Android"],
    },
    {
      id: 3,
      name: "API Service",
      description: "REST API and microservices",
      status: "paused",
      testsRun: 92,
      defectsFound: 3,
      coverage: 78,
      lastRun: "5 days ago",
      environments: ["Production", "Staging"],
    },
    {
      id: 4,
      name: "Admin Dashboard",
      description: "Internal administration panel",
      status: "active",
      testsRun: 156,
      defectsFound: 5,
      coverage: 88,
      lastRun: "30 minutes ago",
      environments: ["Chrome", "Firefox"],
    },
  ])

  const [newProject, setNewProject] = useState({ name: "", description: "" })

  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      const project = {
        id: projects.length + 1,
        ...newProject,
        status: "active",
        testsRun: 0,
        defectsFound: 0,
        coverage: 0,
        lastRun: "Just now",
        environments: [],
      }
      setProjects([...projects, project])
      setNewProject({ name: "", description: "" })
    }
  }

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your testing projects</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Set up a new testing project for your application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Project Name</label>
                <Input
                  placeholder="My App Testing"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Describe your application"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleCreateProject} className="w-full">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-6 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 flex flex-col backdrop-blur-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteProject(project.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                  project.status === "active"
                    ? "bg-gradient-to-r from-success/20 to-success/10 text-success border border-success/30"
                    : "bg-gradient-to-r from-muted/50 to-muted/30 text-muted-foreground border border-muted/50"
                }`}
              >
                {project.status === "active" ? "Active" : "Paused"}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">Tests Run</p>
                <p className="text-xl font-bold text-primary">{project.testsRun}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Defects</p>
                <p className="text-xl font-bold text-destructive">{project.defectsFound}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Coverage</p>
                <p className="text-xl font-bold text-secondary">{project.coverage}%</p>
              </div>
            </div>

            {/* Environments */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Environments</p>
              <div className="flex flex-wrap gap-2">
                {project.environments.length > 0 ? (
                  project.environments.map((env, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 font-medium"
                    >
                      {env}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No environments configured</span>
                )}
              </div>
            </div>

            {/* Last Run */}
            <p className="text-xs text-muted-foreground mb-4">Last run: {project.lastRun}</p>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Link>
              <Button className="gap-2" size="sm" variant="secondary">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Create your first testing project to get started</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Project name" />
                <Input placeholder="Description" />
                <Button className="w-full">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}
