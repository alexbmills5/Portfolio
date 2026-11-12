import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alex Mills — Software Engineer";
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
        background: "radial-gradient(ellipse at 90% 75%, #3b211d, #100e0e 65%)",
        color: "#f7eee8",
        padding: "60px 70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#c4b6b0",
        }}
      >
        <span>SOFTWARE ENGINEER</span>
        <span>Palm Harbor, Florida</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 138,
          letterSpacing: -10,
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        <span>Alex Mills</span>
        <span style={{ color: "#ff7766" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#c4b6b0",
          borderTop: "1px solid #f5d8ca40",
          paddingTop: 25,
        }}
      >
        <span>Full stack applications · REST APIs · Immersive software</span>
        <span>topaso.net</span>
      </div>
    </div>,
    size,
  );
}
