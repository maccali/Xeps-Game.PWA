/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
import React, { useEffect, useRef } from 'react'

function DisturbedContent() {
  const div = useRef(null)

  useEffect(() => {
    const p5 = require('p5')
    let sketch = new p5((p: any) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(
          div.current
        )
      }
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.draw = () => {
        p.background(15)

        p.translate(240 + p.frameCount, 0, 0)
        p.push()
        p.rotateZ(p.frameCount * 0.01)
        p.rotateX(p.frameCount * 0.01)
        p.rotateY(p.frameCount * 0.01)
        p.box(70, 70, 70)
        p.pop()

        p.translate(240 - p.frameCount, 50, 0)
        p.push()
        p.rotateZ(p.frameCount * 0.01)
        p.rotateX(p.frameCount * 0.01)
        p.rotateY(p.frameCount * 0.01)
        p.torus(70, 20)
        p.pop()

        // if (p.mouseIsPressed) {
        //   p.stroke(225)
        // } else {
        //   p.stroke(0, 0, 0)
        // }

        // p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY)
        // p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY)
      }
    })
  }, [])

  return (
    <>
      <div ref={div}></div>
    </>
  )
}

export default DisturbedContent
