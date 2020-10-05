/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */

import React, { useEffect, useRef, useState } from 'react'

function DisturbedContent() {
  const div = useRef(null)

  const [shapes, setShapes] = useState<Array<any>>([
    { initial: true },
    { initial: true },

    { initial: true },
    { initial: true },

    { initial: true }
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true },
    // { initial: true }
  ])

  let numberOfShapes = 20

  useEffect(() => {
    const p5 = require('p5')
    const ww = window.screen.width
    const wh = window.screen.height

    let sketch = new p5((p: any) => {
      // shapes.map((items, index) => {
      //   shapes[index] = p
      //   shapes[index].initial = true
      //   // console.log('fdfsd')
      // })

      function numbersToAray(startNumber: number) {
        let array = []
        let current = startNumber
        for (let i = 0; i < 25; i++) {
          array[i] = Math.floor(current)
          current++
        }

        // console.log(array)
        return array
      }

      function intersects(one: any, another: any) {
        one.dx = numbersToAray(one.x - 25 / 2)
        one.dy = numbersToAray(one.y - 25 / 2)
        another.dx = numbersToAray(another.x - 25 / 2)
        another.dy = numbersToAray(another.y - 25 / 2)


        if (one.dx.includes(another.dx)) {
          console.log('bateu')
          return true
        }
        if (one.dy.includes(another.dy)) {
          console.log('bateu')
          return true
        }

        return false
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

        // console.log( )

        shapes.forEach((item, index) => {
          const maxWidth = p.windowWidth / 2
          const minWidth = maxWidth * -1
          const maxHight = p.windowWidth / 2
          const minHight = maxHight * -1

          if (shapes[index].initial) {
            shapes[index].cax = Math.random() * 3
            shapes[index].cay = Math.random() * 3
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
            p.rotateZ(20)
            p.rotateX(25)
            p.rotateY(5)
            p.box(25, 25, 25)
            p.pop()
          } else {
            if (shapes[index].x > maxWidth) {
              shapes[index].cax = shapes[index].cax * -1
            }
            if (shapes[index].x < minWidth) {
              shapes[index].cax = shapes[index].cax * -1
            }

            shapes[index].x += shapes[index].cax

            if (shapes[index].y > maxHight) {
              shapes[index].cay = shapes[index].cay * -1
            }
            if (shapes[index].y < minHight) {
              shapes[index].cay = shapes[index].cay * -1
            }

            shapes[index].y += shapes[index].cay

            for (let shape of shapes) {
              let overlapping = false
              for (let other of shapes) {
                if (shape !== other && intersects(shape, other)) {
                  overlapping = true
                }
                if (overlapping) {
                  shape.cay = shape.cay * -1
                  shape.cax = shape.cax * -1
                }
              }
            }

            // for (let i; i < shapes.length; i++) {
            //   let overlapping = false
            //   console.log('fdsfs')
            //   for (let j; j < shapes.length; j++) {
            //     console.log(i !== j)
            //     console.log(intersects(shapes[i], shapes[j]))
            //     if (i !== j && intersects(shapes[i], shapes[j])) {
            //       overlapping = true
            //     }
            //   }
            //   if (overlapping) {
            //     shapes[i].cay = shapes[i].cay * -1
            //     shapes[i].cax = shapes[i].cax * -1
            //   }
            // }

            // for (let b of shapes) {
            //   let overlapping = false
            //   for (let other of shapes) {
            //     if (b !== other && intersects(b, other)) {
            //       overlapping = true
            //     }
            //   }
            // }
            // if (overlapping) {
            //   b.cay = b.cay * -1
            //   b.cax = b.cax * -1
            // }

            p.push()
            p.translate(shapes[index].x, shapes[index].y, 0)
            p.rotateZ(20)
            p.rotateX(25)
            p.rotateY(5)
            p.box(25, 25, 25)
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
