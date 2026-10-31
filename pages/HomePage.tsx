import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  BookOpen,
  Code2,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Layers,
  Square,
  Spline,
  Scan,
  Palette,
  CircleDot,
  Zap,
  Recycle,
  Maximize,
  Library,
  MousePointer,
  Globe,
} from 'lucide-react';
import { useDocs, groupTypesByCategory, Notice } from '@lightside/docs-system';

const Code = ({ children }: { children: ReactNode }) => (
  <code className="px-1 py-0.5 rounded bg-white/10 text-[var(--color-accent)] text-[0.85em] font-mono">
    {children}
  </code>
);

interface Highlight {
  icon: typeof Globe;
  title: string;
  description: ReactNode;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Square,
    title: '13 Analytic Primitives',
    description:
      'Rounded rect, circle, ellipse, capsule, triangle, pentagon, hexagon, octagon, star, pie, arc, ring and cut disk — each an exact closed-form distance field sized from the RectTransform',
  },
  {
    icon: Layers,
    title: 'Layer Stack',
    description: (
      <>
        Fill, stroke, drop shadow and inner shadow layers in any number and any order, each with its
        own paint, blend mode and per-side <Code>padding</Code>
      </>
    ),
  },
  {
    icon: Spline,
    title: 'Vector Outlines',
    description: (
      <>
        Cubic Bézier paths and SVG <Code>d</Code> attributes flatten to an exact polygon SDF, so an
        imported outline takes the same strokes, shadows and gradients as a circle
      </>
    ),
  },
  {
    icon: Scan,
    title: 'Sprite Tracing',
    description:
      'Moore-neighbor contour tracing with Ramer–Douglas–Peucker simplification turns a sprite silhouette into an editable outline, in-package and dependency-free',
  },
  {
    icon: Palette,
    title: 'Unlimited-Stop Gradients',
    description:
      'Color and alpha share one stop list, interpolated in sRGB, linear light, Oklab or hard steps. Ramps bake into a shared atlas, so gradient shapes still batch',
  },
  {
    icon: CircleDot,
    title: 'Distance Projection',
    description: (
      <>
        Beside linear, radial and angular projections, a paint can run its ramp inward from the
        outline itself — edge fades, inner glows and neon rings a mesh cannot express
      </>
    ),
  },
  {
    icon: Zap,
    title: 'One Draw Call',
    description: (
      <>
        Consecutive layers sharing a blend mode and texture merge into one sub-mesh on a single{' '}
        <Code>CanvasRenderer</Code>, and shapes batch with UniText and UniLottie through the shared
        surface material
      </>
    ),
  },
  {
    icon: Recycle,
    title: 'Zero-GC Rebuilds',
    description:
      'A shared vertex helper, pooled render groups, reused flattening buffers and in-place atlas re-bakes: rebuilding a shape allocates nothing',
  },
  {
    icon: Maximize,
    title: 'Resolution Independent',
    description:
      'The field is evaluated per pixel with derivative-based anti-aliasing, so scale and DPI changes need no re-tessellation — corner radius, stroke width and blur stay crisp at any zoom',
  },
  {
    icon: Library,
    title: 'Shared Assets',
    description: (
      <>
        <Code>ShapeLibrary</Code> assets name outlines once and hand them to any number of shapes;{' '}
        <Code>LayerPreset</Code> assets carry a reusable layer stack and repaint every shape that
        references them
      </>
    ),
  },
  {
    icon: MousePointer,
    title: 'In-Scene Vector Editing',
    description:
      'Box select, modal grab / scale / rotate with numeric entry, Ctrl-click to split a segment, keys 1–5 for handle modes, coalesced undo — in the SceneView and in the inspector canvas',
  },
  {
    icon: Globe,
    title: 'Wide Platform Reach',
    description:
      'Shader Model 3.5: desktop, consoles, iOS Metal, Android GLES3 / Vulkan and WebGL2. Polygon outlines travel in a plain data texture rather than a structured buffer, so they run there too',
  },
];

const QUICK_LINKS = [
  {
    id: 'quick-start',
    icon: BookOpen,
    title: 'Quick Start',
    description: 'Install UniShapes and build your first shape in 5 minutes',
    href: '/getting-started',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    id: 'api-reference',
    icon: Code2,
    title: 'API Reference',
    description: 'Complete API documentation for all public types',
    href: '/api',
    color: 'bg-blue-500/20 text-blue-400',
  },
];

export default function HomePage() {
  const { apiData, version, versionedBasePath, categoryInfo, config } = useDocs();

  if (!apiData) {
    return <div className="text-white/50">Loading...</div>;
  }

  const groupedTypes = groupTypesByCategory(apiData.types, apiData.categories, categoryInfo);
  const categoryIcons = config.categoryIcons || {};

  const quickLinks = QUICK_LINKS.map((link) => ({
    ...link,
    href: `${versionedBasePath}${link.href}`,
  }));

  return (
    <div className="space-y-12">
      <div className="text-center pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-[var(--color-accent)] text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Version {version}
        </div>
        <h1 className="text-4xl font-bold mb-4">UniShapes Documentation</h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          SDF-rendered vector UI shapes for Unity uGUI. One component, a pluggable outline and a
          stack of composable layers — complete API reference, guides and examples.
        </p>
      </div>

      <Notice type="info">
        UniShapes requires Unity 2022.3 or newer and installs <Code>media.lightside.core</Code>{' '}
        alongside it — the shared paint, gradient, state and rendering types every LightSide package
        is built on.
      </Notice>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition">
                  {link.title}
                </h3>
                <p className="text-sm text-white/50 mt-1">{link.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[var(--color-accent)] transition" />
            </Link>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent-to/10 border border-accent/20">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
          Key Features
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white/90 mb-1">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">API by Category</h2>
          <Link
            to={`${versionedBasePath}/api`}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            View all types
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(groupedTypes.entries()).map(([category, types]) => {
            const info = categoryInfo[category];
            const Icon = categoryIcons[category] || Layers;
            return (
              <Link
                key={category}
                to={`${versionedBasePath}/api?category=${category}`}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition flex items-center gap-2">
                    <Icon className="w-4 h-4 text-white/50 group-hover:text-[var(--color-accent)] transition" />
                    {info?.label || category}
                  </h3>
                  <span className="text-sm text-white/40">{types.length} types</span>
                </div>
                <p className="text-sm text-white/50">{info?.description || ''}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
