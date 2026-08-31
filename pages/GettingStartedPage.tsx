/**
 * Getting Started guide page.
 * Comprehensive guide for UniShapes setup and usage.
 */

import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Download,
  Plus,
  Shapes,
  Layers,
  Palette,
  PenTool,
  Scan,
  Library,
  Zap,
  ArrowRight,
  Code,
  Spline,
  Square,
} from 'lucide-react';
import { useDocs, CodeBlock, Notice, AutoLink } from '@lightside/docs-system';

const SHAPE_KINDS = [
  {
    kind: 'RoundedRect',
    params: 'UniformRadius, Radius, CornerRadii, Smoothing',
    notes:
      'Radius 16; per-corner radii are TL, TR, BR, BL. Smoothing 0..1 goes circular → squircle',
  },
  { kind: 'Circle', params: '—', notes: 'Sized from the rect' },
  { kind: 'Ellipse', params: '—', notes: 'Fills the rect' },
  { kind: 'Capsule', params: '—', notes: 'Rectangle with semicircular ends' },
  { kind: 'Triangle', params: '—', notes: 'Equilateral' },
  { kind: 'Pentagon', params: '—', notes: 'Regular' },
  { kind: 'Hexagon', params: '—', notes: 'Regular' },
  { kind: 'Octagon', params: '—', notes: 'Regular' },
  {
    kind: 'Star',
    params: 'StarPoints, StarSharpness',
    notes: '5 points, sharpness 2. Sharpness is clamped to the point count; 2 is the sharpest',
  },
  { kind: 'Pie', params: 'Aperture', notes: 'Sector spanning 1..360°, default 270°' },
  {
    kind: 'Arc',
    params: 'Aperture, Thickness',
    notes: 'Band thickness 0..1 of the radius, default 0.3',
  },
  { kind: 'Ring', params: 'Thickness', notes: 'Annulus, thickness 0..1 of the radius' },
  { kind: 'CutDisk', params: 'Chord', notes: 'Disk cut by a straight chord, height fraction 0..1' },
  {
    kind: 'Polygon',
    params: '—',
    notes: 'Produced by a vector or traced outline (§5, §6), not picked by hand',
  },
];

const LAYERS = [
  {
    type: 'FillLayer',
    paint: 'Fill',
    params: '—',
    notes: 'Fills the interior. A new UniShape starts with exactly one, painted white',
  },
  {
    type: 'StrokeLayer',
    paint: 'Color',
    params: 'Width 2, Alignment 0',
    notes: 'Alignment runs −1 (fully inside) → 0 (centred on the outline) → +1 (fully outside)',
  },
  {
    type: 'ShadowLayer',
    paint: 'Color',
    params: 'Offset (0, −4), Blur 8, Spread 0',
    notes:
      'Place below the fill. Spread grows (or, negative, shrinks) the silhouette before blurring',
  },
  {
    type: 'InnerShadowLayer',
    paint: 'Color',
    params: 'Offset (0, −4), Blur 6',
    notes: 'Hugs the edge opposite the offset, inside the shape — reads as recessed depth',
  },
];

/** Bottom-to-top reading of a layer stack, matching the inspector's own ordering. */
function LayerStackDiagram() {
  const stack = [
    {
      index: 3,
      name: 'StrokeLayer',
      note: 'painted last — sits on top',
      tone: 'border-sky-400/40 bg-sky-400/10',
    },
    {
      index: 2,
      name: 'InnerShadowLayer',
      note: 'depth inside the silhouette',
      tone: 'border-violet-400/40 bg-violet-400/10',
    },
    {
      index: 1,
      name: 'FillLayer',
      note: 'the shape body',
      tone: 'border-emerald-400/40 bg-emerald-400/10',
    },
    {
      index: 0,
      name: 'ShadowLayer',
      note: 'painted first — furthest back',
      tone: 'border-amber-400/40 bg-amber-400/10',
    },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-3">
        Paint order — index 0 first
      </div>
      <div className="space-y-2">
        {stack.map((layer) => (
          <div
            key={layer.name}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${layer.tone}`}
          >
            <span className="w-7 h-7 shrink-0 rounded-md bg-white/10 flex items-center justify-center text-xs font-mono">
              {layer.index}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold leading-tight">{layer.name}</div>
              <div className="text-xs text-white/40">{layer.note}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/50">
        Layers attached through a <code>LayerPreset</code> paint below index 0, so a preset supplies
        the background of a look and the shape's own layers finish it.
      </p>
    </div>
  );
}

export default function GettingStartedPage() {
  const { versionedBasePath, version } = useDocs();
  const basePath = versionedBasePath;

  return (
    <AutoLink>
      <div className="space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50">
          <Link to={basePath} className="hover:text-white transition">
            Docs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Getting Started</span>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-lg text-white/60">
            This guide covers installing UniShapes and building shapes with it — picking an outline,
            stacking layers, painting with gradients, drawing vector paths and tracing sprites.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* Installation                                                        */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Download className="w-6 h-6 text-[var(--color-accent)]" />
            Installation
          </h2>

          <p className="text-white/70 mb-6">
            UniShapes is one UPM package, <code>media.lightside.unishapes</code>. Install it from
            the Light Side registry or from the Asset Store — the package contents are identical,
            only the delivery differs. Both pull in <code>media.lightside.core</code>, which owns
            the shared shader, paint and gradient types.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Scoped registry (Package Manager)</h3>

              <p className="text-white/70 mb-4">
                Your purchase email carries an <strong>access token</strong>. Authenticate the
                registry once per machine by adding it to <code>~/.upmconfig.toml</code> (on
                Windows, <code>%USERPROFILE%\.upmconfig.toml</code>):
              </p>

              <CodeBlock
                language="toml"
                disableTypeLinks
                code={`[npmAuth."https://registry.lightside.media"]
token = "YOUR-ACCESS-TOKEN"
alwaysAuth = true`}
              />

              <p className="text-white/70 mt-6 mb-4">
                Then register the scope and the package in your project's{' '}
                <code>Packages/manifest.json</code>:
              </p>

              <CodeBlock
                language="json"
                disableTypeLinks
                code={`{
  "scopedRegistries": [
    {
      "name": "Light Side",
      "url": "https://registry.lightside.media",
      "scopes": ["media.lightside"]
    }
  ],
  "dependencies": {
    "media.lightside.unishapes": "1.0.0"
  }
}`}
              />

              <p className="text-white/70 mt-6">
                Reopen the project or open <strong>Window &rarr; Package Manager</strong>: UniShapes
                resolves from the registry, and every later version is a version bump in the same
                file.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Asset Store</h3>

              <ol className="space-y-2 text-white/70 list-decimal list-inside">
                <li>Buy UniShapes on the Unity Asset Store with the account you develop under</li>
                <li>
                  In Unity, open <strong>Window &rarr; Package Manager</strong> and switch the
                  source to <strong>My Assets</strong>
                </li>
                <li>
                  Select UniShapes, then <strong>Download</strong> and <strong>Import</strong>. The
                  same window installs updates later
                </li>
              </ol>
            </div>
          </div>

          <Notice type="info" className="mt-4">
            Requires Unity 2022.3 or newer. The samples (Calorie Counter, Meadow Merge) additionally
            require the UniText package; the rest of UniShapes does not.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 1. Adding a UniShape                                                */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6 text-[var(--color-accent)]" />
            1. Adding a UniShape
          </h2>

          <p className="text-white/70 mb-4">
            <code>UniShape</code> is a <code>MaskableGraphic</code>: it lives on a{' '}
            <code>RectTransform</code> under a Canvas, exactly where an <code>Image</code> would.
            Add it through <strong>Add Component &rarr; UI &rarr; UniShape</strong> — the required{' '}
            <code>CanvasRenderer</code> comes with it.
          </p>

          <p className="text-white/70 mb-6">
            Two menu entries create shapes for you, both also reachable from the LightSide command
            palette (<strong>Alt+L</strong>):
          </p>

          <ul className="space-y-2 text-white/70 mb-6 list-disc list-inside">
            <li>
              <strong>GameObject &rarr; UI &rarr; UniShape Primitive Gallery</strong> — a Canvas
              with one cell per shape kind, each already carrying a shadow, a fill and a stroke. The
              fastest way to see what the primitives look like
            </li>
            <li>
              <strong>GameObject &rarr; UI &rarr; UniShape from SVG Path</strong> — paste an SVG{' '}
              <code>d</code> attribute and get a shape whose outline is that path (§5)
            </li>
          </ul>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">1.1 Creating one from code</h3>

              <CodeBlock
                code={`using LightSide;
using UnityEngine;

public class ShapeSpawner : MonoBehaviour
{
    [SerializeField] private RectTransform parent;

    private void Start()
    {
        var go = new GameObject("Card", typeof(RectTransform));
        go.transform.SetParent(parent, false);

        var shape = go.AddComponent<UniShape>();
        shape.rectTransform.sizeDelta = new Vector2(320f, 180f);
        shape.color = Color.white;
    }
}`}
              />

              <p className="text-white/70 mt-4">
                A fresh shape is a rounded rectangle with a 16-unit corner radius and a single white{' '}
                <code>FillLayer</code>. <code>color</code> is the graphic tint: it multiplies into
                every layer's paint, so it fades or tints the whole stack at once.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">1.2 What the inspector shows</h3>

              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <strong>Appearance</strong> — the graphic tint and material
                </li>
                <li>
                  <strong>Geometry</strong> — the <strong>Shape</strong> dropdown (the outline
                  provider, §2), <strong>Layers (bottom &rarr; top)</strong> and{' '}
                  <strong>Layer Presets</strong>. A vector outline additionally offers{' '}
                  <strong>Edit Shape in Scene</strong> and <strong>Fit to Rect</strong>
                </li>
                <li>
                  <strong>Interaction</strong> — raycasting and masking, as on any uGUI graphic
                </li>
              </ul>
            </div>
          </div>

          <Notice type="warning" className="mt-4">
            uGUI mesh effects (<code>IMeshModifier</code>: Shadow, Outline) are not applied to a
            UniShape. Use a <code>ShadowLayer</code> or a <code>StrokeLayer</code> instead — they
            are resolution-independent and cost no extra draw call (§3).
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 2. Choosing a shape kind                                            */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shapes className="w-6 h-6 text-[var(--color-accent)]" />
            2. Choosing a shape kind
          </h2>

          <p className="text-white/70 mb-4">
            The outline is a pluggable provider, picked from the <strong>Shape</strong> dropdown.
            There are four:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Provider</th>
                  <th className="text-left py-2 text-white/60">Outline</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>InlineShapeProvider</code>
                  </td>
                  <td className="py-2">
                    A primitive kind plus its parameters, authored on the component. The default
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>VectorShapeProvider</code>
                  </td>
                  <td className="py-2">A freeform cubic-Bézier path you draw or import (§5)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>SpriteShapeProvider</code>
                  </td>
                  <td className="py-2">The contour traced from a sprite's alpha silhouette (§6)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    <code>AssetShapeProvider</code>
                  </td>
                  <td className="py-2">
                    A named entry from a shared <code>ShapeLibrary</code> (§7)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.1 The 13 analytic primitives</h3>

              <p className="text-white/70 mb-4">
                Every kind below is an exact closed-form signed distance field, so it costs the same
                per pixel whatever its size, and every kind takes its extents from the{' '}
                <code>RectTransform</code>. Only the fields a kind uses are read; the rest keep
                their values until you switch back.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Kind</th>
                      <th className="text-left py-2 pr-4 text-white/60">Parameters</th>
                      <th className="text-left py-2 text-white/60">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {SHAPE_KINDS.map((row) => (
                      <tr key={row.kind} className="border-b border-white/5 last:border-0">
                        <td className="py-2 pr-4 whitespace-nowrap">
                          <code>{row.kind}</code>
                        </td>
                        <td className="py-2 pr-4">{row.params}</td>
                        <td className="py-2">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.2 Setting the outline from code</h3>

              <CodeBlock
                code={`// A six-pointed star
shape.Shape = new InlineShapeProvider
{
    Kind = ShapeKind.Star,
    StarPoints = 6,
    StarSharpness = 2.6f,
};

// A card rounded only at the top, with squircle corners
shape.Shape = new InlineShapeProvider
{
    Kind = ShapeKind.RoundedRect,
    UniformRadius = false,
    CornerRadii = new Vector4(28f, 28f, 0f, 0f),   // TL, TR, BR, BL
    Smoothing = 0.6f,
};

// Tweak the outline already on the component
if (shape.Shape is InlineShapeProvider inline)
{
    inline.Kind = ShapeKind.Ring;
    inline.Thickness = 0.18f;
}`}
              />

              <p className="text-white/70 mt-4">
                <code>Shape</code> is never null: assigning null replaces it with a fresh{' '}
                <code>InlineShapeProvider</code>. Every parameter is clamped on assignment —{' '}
                <code>Aperture</code> to 1..360, <code>Thickness</code> and <code>Chord</code> to
                0..1, <code>StarPoints</code> to at least 2 — so out-of-range input is corrected,
                not rejected.
              </p>
            </div>
          </div>

          <Notice type="info" className="mt-4">
            Switching kind never resizes the element: all analytic kinds fill the same rect. That is
            what makes a kind safe to animate or swap at runtime.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 3. Stacking layers                                                  */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--color-accent)]" />
            3. Stacking layers
          </h2>

          <p className="text-white/70 mb-4">
            One outline, any number of layers. Each layer reads the same distance field and paints a
            different band of it, so a stroke, a shadow and a fill all follow the same edge exactly.
            Index 0 is the bottom of the stack.
          </p>

          <LayerStackDiagram />

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.1 The layer types</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Layer</th>
                      <th className="text-left py-2 pr-4 text-white/60">Paint</th>
                      <th className="text-left py-2 pr-4 text-white/60">Defaults</th>
                      <th className="text-left py-2 text-white/60">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {LAYERS.map((row) => (
                      <tr key={row.type} className="border-b border-white/5 last:border-0">
                        <td className="py-2 pr-4 whitespace-nowrap">
                          <code>{row.type}</code>
                        </td>
                        <td className="py-2 pr-4">
                          <code>{row.paint}</code>
                        </td>
                        <td className="py-2 pr-4">{row.params}</td>
                        <td className="py-2">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mt-4">
                Every layer also carries <code>Enabled</code> and <code>Padding</code> — a per-side
                inset in local units, ordered <strong>left, bottom, right, top</strong>. Padding
                shrinks that layer's copy of the outline, which is how you inset a stroke, tighten
                an inner shadow, or build concentric rings from one shape.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.2 Building a stack from code</h3>

              <CodeBlock
                code={`using LightSide;
using UnityEngine;

public class CardLook : MonoBehaviour
{
    [SerializeField] private UniShape shape;

    private void Start()
    {
        // The default FillLayer sits at index 0 — paint it first.
        var fill = (FillLayer)shape.Layers[0];
        fill.Fill.Color = new Color(0.10f, 0.11f, 0.16f, 1f);

        // A drop shadow belongs underneath everything.
        var shadow = new ShadowLayer { Offset = new Vector2(0f, -6f), Blur = 18f, Spread = 2f };
        shadow.Color.Color = new Color(0f, 0f, 0f, 0.45f);
        shape.InsertLayer(0, shadow);

        // A hairline border on top, inset by two units on every side.
        var stroke = shape.AddLayer<StrokeLayer>();
        stroke.Width = 2f;
        stroke.Alignment = -1f;                       // fully inside the outline
        stroke.Padding = new Vector4(2f, 2f, 2f, 2f); // left, bottom, right, top
        stroke.Color.Color = new Color(1f, 1f, 1f, 0.18f);
    }
}`}
              />

              <p className="text-white/70 mt-4">
                <code>AddLayer</code> appends on top, <code>InsertLayer</code> places by index, and{' '}
                <code>MoveLayer</code>, <code>ReplaceLayer</code>, <code>RemoveLayer</code>,{' '}
                <code>RemoveLayerAt</code>, <code>ClearLayers</code> and <code>SetLayers</code>{' '}
                cover the rest. <code>AddLayer&lt;T&gt;()</code> creates the layer and returns it,
                which is what the stroke above uses.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.3 Blend modes</h3>

              <p className="text-white/70 mb-4">
                Each paint composites with what is beneath it through <code>LayerBlend</code>:{' '}
                <code>Normal</code>, <code>Multiply</code>, <code>Screen</code>,{' '}
                <code>Additive</code> and <code>Exclusion</code>. These are exactly the modes that
                map to portable fixed-function GPU blend state, so they behave identically on every
                platform.
              </p>

              <CodeBlock
                code={`var glow = shape.AddLayer<FillLayer>();
glow.Fill.Color = new Color(1f, 0.35f, 0.1f, 0.6f);
glow.Fill.Blend = LayerBlend.Additive;`}
              />

              <p className="text-white/70 mt-4">
                Consecutive layers that share a blend mode and sampled texture merge into a single
                sub-mesh; a change of either starts a new one on the same{' '}
                <code>CanvasRenderer</code> (§8). Ordering layers so that blend changes are rare
                keeps a shape at one draw.
              </p>
            </div>
          </div>

          <Notice type="warning" className="mt-4">
            A layer instance belongs to exactly one shape or preset, and a stack may not contain the
            same instance twice or a null entry — all three throw rather than silently duplicating
            state. Build a second layer instead of re-adding the first.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 4. Painting with a gradient                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-6 h-6 text-[var(--color-accent)]" />
            4. Painting with a gradient
          </h2>

          <p className="text-white/70 mb-4">
            Every layer takes a full <code>ShapePaint</code>, not just a colour. A paint has a
            source (<code>Solid</code>, <code>Gradient</code> or <code>Texture</code>), a projection
            that decides how that source is laid across the shape, a blend mode, and a tint —{' '}
            <code>Color</code> — that multiplies into a sampled source.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.1 A linear gradient</h3>

              <CodeBlock
                code={`using LightSide;
using UnityEngine;
using Gradient = LightSide.Gradient;

public class SunsetFill : MonoBehaviour
{
    [SerializeField] private UniShape shape;

    private void Start()
    {
        var fill = (FillLayer)shape.Layers[0];
        var paint = fill.Fill;

        paint.Kind = PaintSourceKind.Gradient;
        paint.Color = Color.white;                     // tint applied over the ramp
        paint.ProjectionKind = PaintProjectionKind.Linear;
        paint.Angle = 90f;                             // degrees, counter-clockwise
        paint.Scale = 1f;
        paint.Offset = Vector2.zero;
        paint.Gradient = new Gradient(
            new[]
            {
                new GradientStop(0f, new Color(1f, 0.18f, 0.54f)),
                new GradientStop(0.5f, new Color(1f, 0.48f, 0.12f)),
                new GradientStop(1f, new Color(1f, 0.85f, 0.12f)),
            },
            GradientInterpolation.Perceptual);
    }
}`}
              />

              <p className="text-white/70 mt-4">
                Stops are unlimited and carry alpha in the same list, and the interpolation space is
                yours to pick: <code>Smooth</code> (sRGB), <code>Linear</code> (linear light),{' '}
                <code>Perceptual</code> (Oklab — no muddy midpoints) or <code>Stepped</code> (hard
                bands). Multi-stop ramps bake into a shared ramp atlas, so gradient shapes still
                batch with flat ones.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.2 Projections</h3>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Projection</th>
                      <th className="text-left py-2 text-white/60">The ramp runs</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Linear</code>
                      </td>
                      <td className="py-2">
                        Along a straight axis, rotated by <code>Angle</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Radial</code>
                      </td>
                      <td className="py-2">Outward from the projection centre</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Angular</code>
                      </td>
                      <td className="py-2">Around the centre by angle — a conic sweep</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>Distance</code>
                      </td>
                      <td className="py-2">
                        Inward from the outline itself, following the distance field
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                The first three are geometric and share <code>Angle</code>, <code>Scale</code> and{' '}
                <code>Offset</code>. <code>Distance</code> is the shape-specific one: it is a flag
                on the paint rather than a kind, and it maps the ramp by signed distance from the
                edge — edge fades, inner glows and neon rings that follow any outline, however
                irregular.
              </p>

              <CodeBlock
                code={`// A glow that hugs the edge, whatever the outline is
var edge = shape.AddLayer<FillLayer>();
edge.Fill.Kind = PaintSourceKind.Gradient;
edge.Fill.Distance = true;
edge.Fill.Blend = LayerBlend.Additive;
edge.Fill.Gradient = new Gradient(
    new[]
    {
        new GradientStop(0f, new Color(0.35f, 0.9f, 1f, 0.9f)),   // at the outline
        new GradientStop(0.35f, new Color(0.35f, 0.9f, 1f, 0f)),  // fading inward
    },
    GradientInterpolation.Linear);`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.3 Textures, spread and fit</h3>

              <p className="text-white/70 mb-4">
                A texture paint samples a <code>Texture2D</code> through the same projection.{' '}
                <code>Fit</code> — <code>Stretch</code>, <code>Contain</code>, <code>Cover</code> or{' '}
                <code>Tile</code> — decides how the source's own aspect meets the shape's frame.
              </p>

              <CodeBlock
                code={`var pattern = shape.AddLayer<FillLayer>();
pattern.Fill.Kind = PaintSourceKind.Texture;
pattern.Fill.Texture = grainTexture;
pattern.Fill.Fit = PaintFit.Tile;
pattern.Fill.Scale = 6f;                 // with Tile, the repeat count
pattern.Fill.Blend = LayerBlend.Multiply;`}
              />

              <p className="text-white/70 mt-4 mb-4">
                How a gradient continues outside its frame is <code>PaintSpread</code> —{' '}
                <code>Clamp</code>, <code>Repeat</code> or <code>Mirror</code>. It lives on the
                projection, so set it through the paint value:
              </p>

              <CodeBlock
                code={`var value = pattern.Fill.Paint;
value.projection.spread = PaintSpread.Mirror;
pattern.Fill.Paint = value;`}
              />

              <Notice type="info" className="mt-4">
                Sampled sources fail visibly, never silently: a texture paint with no texture
                renders magenta, and a gradient with no stops falls back to its tint as a flat
                colour.
              </Notice>
            </div>
          </div>

          <Notice type="warning" className="mt-4">
            <code>LightSide.Gradient</code> replaces <code>UnityEngine.Gradient</code> and shares
            its name. In a file that has <code>using UnityEngine;</code>, add{' '}
            <code>using Gradient = LightSide.Gradient;</code> — the same applies to{' '}
            <code>GradientStop</code> if you also use Unity's.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 5. Authoring a vector outline                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-[var(--color-accent)]" />
            5. Authoring a vector outline
          </h2>

          <p className="text-white/70 mb-6">
            Switch <strong>Shape</strong> to <code>VectorShapeProvider</code> and the outline
            becomes an editable cubic-Bézier path, flattened to an exact polygon distance field. It
            is not a triangulated mesh: strokes, shadows, inner shadows and distance gradients work
            on it exactly as they do on a circle, and it is normalized to the rect, so authoring
            scale does not matter. A freshly picked vector shape starts as a hexagon.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Spline className="w-4 h-4 text-white/40" />
                5.1 Editing in the SceneView
              </h3>

              <p className="text-white/70 mb-4">
                Press <strong>Edit Shape in Scene</strong> in the inspector — or pick the{' '}
                <strong>Edit Vector Shape</strong> tool from the toolbar — and the path becomes
                directly editable:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Input</th>
                      <th className="text-left py-2 text-white/60">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Click / Shift-click / drag a box</td>
                      <td className="py-2">Select one, add to the selection, or select a region</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>G</code> / <code>S</code> / <code>R</code>
                      </td>
                      <td className="py-2">
                        Modal grab, scale, rotate — with axis constraint and typed numbers
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Ctrl-click a segment</td>
                      <td className="py-2">Split it, preserving the curve's shape</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Delete</code>
                      </td>
                      <td className="py-2">Remove the selected knots</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>C</code>
                      </td>
                      <td className="py-2">Toggle the contour open or closed</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>1</code>–<code>5</code>
                      </td>
                      <td className="py-2">Handle type: free, aligned, mirrored, auto, vector</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mt-4">
                Edits are one coalesced undo step. <strong>Fit to Rect</strong> re-fits the path to
                the current rect after you have moved points around.
              </p>

              <Notice type="info" className="mt-4">
                Unity's own tool shortcuts can claim <code>G</code>/<code>S</code>/<code>R</code> (R
                = Scale). If they do, bind them for this tool in{' '}
                <strong>Edit &rarr; Shortcuts</strong>.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.2 Importing an SVG path</h3>

              <p className="text-white/70 mb-4">
                <strong>GameObject &rarr; UI &rarr; UniShape from SVG Path</strong> opens a window
                that takes an SVG <code>&lt;path&gt;</code> <code>d</code> attribute, parses it,
                parents the result under the selected Canvas and fits it to the rect. The parser
                handles <code>M L H V C S Q T A Z</code> in both absolute and relative form,
                converts elliptical arcs to cubics and flips the y axis to Unity's convention.
              </p>

              <CodeBlock
                code={`var vector = new VectorShapeProvider();

if (SvgPath.TryParse(d, vector.Path, out var error))
{
    vector.Path.FitInto(shape.rectTransform.rect, padding: 8f);
    shape.Shape = vector;
}
else
{
    Debug.LogError("SVG path rejected: " + error);
}`}
              />

              <Notice type="info" className="mt-4">
                One contour only — the first sub-path is imported and holes are not supported. Split
                a multi-contour glyph into several shapes, or trace it as a sprite (§6).
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.3 Building a path from code</h3>

              <p className="text-white/70 mb-4">
                <code>BezierShapes</code> rebuilds a path as a fully editable contour — the result
                is still a Bézier path, not a baked outline, so the vector tool can take it further.
              </p>

              <CodeBlock
                code={`var vector = new VectorShapeProvider();

BezierShapes.Star(vector.Path, points: 5, outerRadius: 60f, innerRadius: 26f);
// also: Circle, Ellipse, RegularPolygon, RoundedRect, Capsule, Sector, Arc

vector.FlattenTolerance = 0.35f;   // smaller = smoother curves, more vertices
shape.Shape = vector;`}
              />

              <p className="text-white/70 mt-4">
                <code>BezierPath</code> itself offers the rest: <code>Add</code>,{' '}
                <code>Insert</code>, <code>RemoveAt</code>, <code>SplitSegment</code>,{' '}
                <code>SetMode</code>, <code>Reverse</code> (flips winding, which is how you author a
                hole for a shape that supports one), <code>Flatten</code>, <code>ClosestPoint</code>
                , <code>Bounds</code> and <code>FitInto</code>.
              </p>
            </div>
          </div>

          <Notice type="warning" className="mt-4">
            A polygon outline carries at most <strong>64 vertices</strong> after flattening, and up
            to
            <strong> 256</strong> distinct polygons stay resident at once. Past that the atlas logs
            a warning and reuses rows — raise <code>FlattenTolerance</code> or share one outline
            through a <code>ShapeLibrary</code> (§7) rather than authoring near-identical copies.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 6. Tracing a sprite                                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Scan className="w-6 h-6 text-[var(--color-accent)]" />
            6. Tracing a sprite
          </h2>

          <p className="text-white/70 mb-6">
            A <code>TracedShapeAsset</code> pairs a sprite with the contour traced from its alpha
            silhouette, so a stroke, a shadow or a distance gradient can follow artwork that was
            never authored as a vector. The tracer is Moore-neighbour boundary following with
            Ramer–Douglas–Peucker simplification, written in-package — no external tracing
            dependency.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.1 Creating the asset</h3>

              <ol className="space-y-2 text-white/70 list-decimal list-inside mb-4">
                <li>
                  Enable <strong>Read/Write</strong> in the sprite texture's import settings —
                  tracing reads its pixels
                </li>
                <li>
                  Right-click the sprite and choose <strong>Create Traced Shape from Sprite</strong>{' '}
                  (or <strong>Assets &rarr; Create &rarr; UI &rarr; Traced Shape</strong> and assign
                  the sprite yourself)
                </li>
                <li>
                  Tune <strong>Alpha Threshold</strong> (default 0.5) and{' '}
                  <strong>Simplify Epsilon</strong> (default 1.5), then press{' '}
                  <strong>Retrace from Sprite</strong>
                </li>
              </ol>

              <p className="text-white/70">
                The asset's inspector draws the contour over the sprite and edits it with the same
                tool as the SceneView — same selection, same modal transforms, same handle keys
                (§5.1) — so a trace is a starting point you can clean up by hand.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.2 Using it on a shape</h3>

              <CodeBlock
                code={`using LightSide;
using UnityEngine;

public class BadgeOutline : MonoBehaviour
{
    [SerializeField] private UniShape shape;
    [SerializeField] private TracedShapeAsset traced;

    private void Start()
    {
        shape.Shape = new SpriteShapeProvider { Traced = traced };

        var rim = shape.AddLayer<StrokeLayer>();
        rim.Width = 4f;
        rim.Alignment = 1f;                                  // fully outside the silhouette
        rim.Color.Color = new Color(1f, 0.85f, 0.2f, 1f);
    }
}`}
              />

              <p className="text-white/70 mt-4">
                Editing the asset — retracing it, or moving a knot — rebuilds every shape that
                references it. The contour is normalized to each shape's rect, so one traced asset
                serves badges of any size.
              </p>
            </div>
          </div>

          <Notice type="warning" className="mt-4">
            A traced shape supplies the <strong>outline</strong>; the layer stack still supplies the
            paint. It also reports the sprite's texture as the graphic's <code>mainTexture</code>,
            which necessarily takes it out of the shared batch (§8) — a reason to keep traced shapes
            for the few elements that need them.
          </Notice>

          <Notice type="info" className="mt-4">
            One outer contour is traced; interior holes are not. The 64-vertex polygon budget
            applies here too, and the asset inspector warns when a trace exceeds it — raise{' '}
            <strong>Simplify Epsilon</strong> and retrace.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 7. Sharing outlines and looks                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Library className="w-6 h-6 text-[var(--color-accent)]" />
            7. Sharing outlines and looks
          </h2>

          <p className="text-white/70 mb-6">
            Two assets keep a project from re-authoring the same shape twice — one for the outline,
            one for the layer stack. Both are created from{' '}
            <strong>Assets &rarr; Create &rarr; UI</strong>, and both push their edits into every
            shape that references them.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Square className="w-4 h-4 text-white/40" />
                7.1 Shape Library
              </h3>

              <p className="text-white/70 mb-4">
                A <code>ShapeLibrary</code> is a named catalogue of outlines. Each entry may use any
                provider, so one library mixes primitives, vector paths and traced sprites; a shape
                picks an entry by name, case-insensitively.
              </p>

              <CodeBlock
                code={`// Authoring the library
library.Add("badge", new InlineShapeProvider { Kind = ShapeKind.Star, StarPoints = 6 });
library.Add("pill", new InlineShapeProvider { Kind = ShapeKind.Capsule });

// Using it
shape.Shape = new AssetShapeProvider { Library = library, ShapeName = "badge" };`}
              />

              <p className="text-white/70 mt-4">
                A name that matches nothing falls back to a circle, so a renamed entry degrades
                visibly instead of leaving an invisible element behind.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-white/40" />
                7.2 Layer Preset
              </h3>

              <p className="text-white/70 mb-4">
                A <code>LayerPreset</code> carries a reusable layer stack — a house shadow, a glass
                surface, a brand gradient. Attached presets paint <strong>below</strong> the shape's
                own layers, so a shape adds its specifics on top of a shared base.
              </p>

              <CodeBlock
                code={`shape.AddLayerPreset(cardSurfacePreset);

// Presets are ordered too, and each asset may appear only once per shape.
shape.InsertLayerPreset(0, brandGlowPreset);
shape.RemoveLayerPreset(cardSurfacePreset);`}
              />

              <p className="text-white/70 mt-4">
                Editing the preset asset rebuilds every shape using it, live, in the editor and at
                runtime.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 8. Batching and performance                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[var(--color-accent)]" />
            8. Batching and performance
          </h2>

          <p className="text-white/70 mb-4">
            Everything a shape needs — kind, corner radii, stroke width, blur, paint coordinates —
            travels in vertex channels, so differently sized, differently painted shapes share one
            material and batch together. What matters in practice is what breaks a batch:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Situation</th>
                  <th className="text-left py-2 text-white/60">Cost</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    All-<code>Normal</code>, texture-free stack (shadow + fill + stroke)
                  </td>
                  <td className="py-2">One sub-mesh, the shared material, one draw</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">A layer changes blend mode or sampled texture</td>
                  <td className="py-2">
                    A new sub-mesh on the same <code>CanvasRenderer</code> — no extra GameObject
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Multi-stop gradients</td>
                  <td className="py-2">Free: ramps share one atlas texture</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">A traced-sprite outline (§6)</td>
                  <td className="py-2">Leaves the shared batch — it reports a texture</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">A polygon outline (§5)</td>
                  <td className="py-2">
                    O(N) per pixel, N ≤ 64, against O(1) for the analytic kinds
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 mb-4">
            Shapes render through the shared LightSide surface material, the same instance UniText
            glyphs and UniLottie quads use — so text, shapes and vector animation on one Canvas
            collapse into a single draw call rather than three. Rebuilds allocate nothing: the
            vertex helper is shared, render groups are pooled, flattening buffers are reused, and
            gradient and polygon atlas rows re-bake in place only when their contents change.
          </p>

          <p className="text-white/70">
            Because the outline is a field rather than a mesh, scale and DPI changes need no
            re-tessellation at all — corner radius, stroke width and shadow blur stay exact at any
            zoom, and animating a radius, an aperture or a star's point count is a per-pixel
            parameter change, not a rebuild of geometry.
          </p>

          <Notice type="info" className="mt-4">
            Shader Model 3.5 is the baseline: desktop, consoles, iOS Metal, Android GLES3 / Vulkan
            and WebGL2. GLES2 and WebGL1 are out of scope.
          </Notice>

          <Notice type="warning" className="mt-4">
            Overriding <code>material</code> with your own is supported, but a non-
            <code>Normal</code> blend or a texture paint requires that material to implement the
            LightSide paint contract. A material that does not fails loudly with the reason named,
            rather than rendering something wrong.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* Next Steps                                                          */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent-to/10 border border-accent/20">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to={`${basePath}/api/UniShape`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Square className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Explore the UniShape API</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=layers`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Layers className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Layer reference</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=paint`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Palette className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Paints and gradients</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=vector`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Code className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Bézier, SVG and tracing</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Documentation for UniShapes {version.replace(/^v/, '')}.
          </p>
        </section>
      </div>
    </AutoLink>
  );
}
