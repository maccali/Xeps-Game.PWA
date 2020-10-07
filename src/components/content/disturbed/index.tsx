/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */

import React, { useEffect, useRef, useState } from 'react'

function DisturbedContent() {
  const div = useRef(null)

  const [shapes, setShapes] = useState<Array<any>>([
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false },
    { initial: true, stuck: false }
  ])

  useEffect(() => {
    const p5 = require('p5')

    const size = 12

    let sketch = new p5((p: any) => {
      function numbersToAray(startNumber: number, endNumber: number) {
        let array = []
        let current = startNumber
        let i = 0

        while (current <= endNumber) {
          array[i] = Math.floor(current)
          current++
          i++
        }
        return array
      }

      function intersects(one: any, another: any) {
        one.minX = one.x - size
        one.maxX = one.x + size
        one.minY = one.y - size
        one.maxY = one.y + size
        another.minX = another.x - size
        another.maxX = another.x + size
        another.minY = another.y - size
        another.maxY = another.y + size

        return (
          one.minX <= another.maxX &&
          one.maxX >= another.minX &&
          one.minY <= another.maxY &&
          one.maxY >= another.minY
        )
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(
          div.current
        )
      }
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.draw = () => {
        p.background(155)

        // console.log( p.windowWidth, p.windowHeight)

        shapes.forEach((item, index) => {
          const maxWidth = p.windowWidth / 2
          const minWidth = maxWidth * -1
          const maxHight = p.windowHight / 2
          const minHight = maxHight * -1

          if (shapes[index].initial) {
            shapes[index].cax = Math.random() * 3
            shapes[index].cay = Math.random() * 3
            shapes[index].ca1 = Math.random() * 3
            shapes[index].ca2 = Math.random() * 3
            shapes[index].ca3 = Math.random() * 3
            if (Math.random() > 0.5) {
              shapes[index].cax = shapes[index].cax * -1
            }
            if (Math.random() > 0.5) {
              shapes[index].cay = shapes[index].cay * -1
            }

            shapes[index].x = shapes[index].cax * 30
            shapes[index].y = shapes[index].cay * 40

            shapes[index].initial = false
            p.push()
            p.translate(shapes[index].x, shapes[index].y, 0)
            p.rotateZ(shapes[index].ca1)
            p.rotateX(shapes[index].ca2)
            p.rotateY(shapes[index].ca3)
            p.box(size * 2, size * 2, size * 2)
            p.pop()
          } else {
            if (shapes[index].x > maxWidth) {
              shapes[index].x = maxWidth - 1
              shapes[index].cax = shapes[index].cax * -1
            }
            if (shapes[index].x < minWidth) {
              shapes[index].x = minWidth + 1
              shapes[index].cax = shapes[index].cax * -1
            }

            shapes[index].x += shapes[index].cax

            if (shapes[index].y > maxHight) {
              shapes[index].y = maxHight - 1
              shapes[index].cay = shapes[index].cay * -1
            }
            if (shapes[index].y < minHight) {
              shapes[index].y = minHight + 1
              shapes[index].cay = shapes[index].cay * -1
            }

            shapes[index].y += shapes[index].cay

            for (let shape of shapes) {
              let overlapping = false
              for (let other of shapes) {
                // console.log(intersects(shape, other))
                if (shape !== other && intersects(shape, other)) {
                  overlapping = true
                }
                if (overlapping) {
                  if (shape.x > other.x) {
                    shape.cax = Math.random() * 3
                    other.cax = Math.random() * 3 * -1
                  }
                  if (shape.y > other.y) {
                    shape.cay = Math.random() * 3
                    other.cay = Math.random() * 3 * -1
                  }
                }
              }
            }

            p.push()
            p.translate(shapes[index].x, shapes[index].y, 0)
            p.rotateZ(shapes[index].ca1)
            p.rotateX(shapes[index].ca2)
            p.rotateY(shapes[index].ca3)
            p.box(size * 2, size * 2, size * 2)
            p.pop()
          }
        })
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
