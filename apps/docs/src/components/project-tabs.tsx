import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'
import type { ProjectInfo } from '../lib/docs'

interface ProjectTabsProps {
  projects: ProjectInfo[]
  currentProject: string
  switchUrls: Record<string, string>
}

export function ProjectTabs({ projects, currentProject, switchUrls }: ProjectTabsProps) {
  if (projects.length <= 1) return null

  return (
    <div className="border-b bg-background">
      <div className="flex h-10 items-end overflow-x-auto px-6 max-w-350 mx-auto">
        {projects.map((project, index) => {
          const isActive = project.name === currentProject
          return (
            <a
              key={project.name}
              href={switchUrls[project.name] ?? '#'}
              className={cn(
                'flex items-center gap-2 -mb-px border-b-2 px-4 py-2 text-sm whitespace-nowrap transition-colors',
                index === 0 && 'pl-0',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-t-sm',
                isActive
                  ? 'border-primary text-foreground font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40',
              )}
            >
              {project.icon && <Icon icon={`lucide:${project.icon}`} className="size-4 shrink-0" />}
              {project.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}
