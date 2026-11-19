import { getProject, profile } from './portfolio.js'

export const site = {
  url: 'https://sanujaalphonsus.com.lk',
  name: 'Sanuja Alphonsus',
  fullName: profile.fullName,
  defaultImage: '/SA.jpg',
  linkedin: profile.linkedin,
  github: profile.github,
}

export const publicRoutes = [
  {
    path: '/',
    label: 'Home',
    navigation: true,
    title: 'Sanuja Alphonsus | IT & Management Undergraduate',
    description:
      'Sanuja Alphonsus is an IT & Management undergraduate at the University of Moratuwa, building practical software with a focus on technology and business.',
  },
  {
    path: '/skills/',
    label: 'Skills',
    navigation: true,
    title: 'Skills | Sanuja Alphonsus',
    description:
      'Technical, development, business, and professional skills of Sanuja Alphonsus, an IT & Management undergraduate at the University of Moratuwa.',
  },
  {
    path: '/projects/',
    label: 'Projects',
    navigation: true,
    title: 'Projects | Sanuja Alphonsus',
    description:
      'Selected software, web, data, and IoT projects by Sanuja Alphonsus.',
  },
  {
    path: '/journey/',
    label: 'Journey',
    navigation: true,
    title: 'Journey | Sanuja Alphonsus',
    description:
      'Education, CIMA studies, project work, and professional experience of Sanuja Alphonsus.',
  },
  {
    path: '/contact/',
    label: 'Contact',
    navigation: true,
    title: 'Contact | Sanuja Alphonsus',
    description:
      'Contact Sanuja Alphonsus about software, IT, internship opportunities, and useful ideas.',
  },
  {
    path: '/blogs/',
    label: 'Blog',
    navigation: true,
    title: 'Blog | Sanuja Alphonsus',
    description:
      'Technical notes, project reflections, and lessons from building software and systems.',
  },
]

export const routeByPath = Object.fromEntries(
  publicRoutes.map((route) => [route.path, route]),
)

export const navigationRoutes = publicRoutes.filter((route) => route.navigation)

export function canonicalPath(path = '/') {
  const pathname = String(path).split(/[?#]/)[0].replace(/\/+$/, '')
  return pathname ? `${pathname}/` : '/'
}

export function absoluteUrl(path) {
  return `${site.url}${canonicalPath(path)}`
}

export function getBlogSlug(path) {
  return canonicalPath(path).match(/^\/blogs\/([^/]+)\/$/)?.[1] || null
}

export function getProjectSlug(path) {
  return canonicalPath(path).match(/^\/projects\/([^/]+)\/$/)?.[1] || null
}

export function getPageMetadata(path, post = null) {
  if (post) {
    const canonical = absoluteUrl(`/blogs/${post.slug}/`)

    return {
      title: `${post.title} | ${site.name}`,
      description: post.description,
      canonical,
      type: 'article',
      image: `${site.url}${post.coverImage || site.defaultImage}`,
      publishedTime: post.date,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        mainEntityOfPage: canonical,
        image: `${site.url}${post.coverImage || site.defaultImage}`,
        author: {
          '@type': 'Person',
          name: site.fullName,
          url: site.url,
        },
      },
    }
  }

  const projectSlug = getProjectSlug(path)
  const project = projectSlug ? getProject(projectSlug) : null

  if (project?.caseStudy) {
    const canonical = absoluteUrl(`/projects/${project.slug}/`)
    return {
      title: `${project.title} | Projects | ${site.name}`,
      description: project.caseStudy.lead,
      canonical,
      type: 'website',
      image: `${site.url}${project.image || site.defaultImage}`,
    }
  }

  const route = routeByPath[canonicalPath(path)]

  if (!route) {
    return {
      title: `Page not found | ${site.name}`,
      description: 'The requested page could not be found.',
      canonical: absoluteUrl('/'),
      type: 'website',
      image: `${site.url}${site.defaultImage}`,
      robots: 'noindex, follow',
    }
  }

  const metadata = {
    title: route.title,
    description: route.description,
    canonical: absoluteUrl(route.path),
    type: 'website',
    image: `${site.url}${site.defaultImage}`,
  }

  if (route.path === '/') {
    metadata.structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.fullName,
      url: site.url,
      jobTitle: 'IT & Management Undergraduate',
      description: route.description,
      sameAs: [site.linkedin, site.github],
    }
  }

  return metadata
}
