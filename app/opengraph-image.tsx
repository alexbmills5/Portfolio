import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Alex Mills — Software Engineer. Built to work. Made to matter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b090a",
        color: "#f5f3f4",
        padding: "60px 70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Alex Mills.</span>
        <span style={{ color: "#d3d3d3", fontSize: 18 }}>
          SOFTWARE ENGINEER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 94,
          letterSpacing: -5,
          lineHeight: 1.1,
        }}
      >
        <span>Built to work.</span>
        <span style={{ color: "#e5383b" }}>Made to matter.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#d3d3d3",
          borderTop: "1px solid #d3d3d326",
          paddingTop: 25,
        }}
      >
        <span>Full stack applications · REST APIs · User experience</span>
        <span>topaso.net</span>
      </div>
    </div>,
    size,
  );
}
