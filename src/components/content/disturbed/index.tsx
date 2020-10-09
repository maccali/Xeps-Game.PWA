/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */

import React, { useEffect, useRef, useState } from 'react'

function DisturbedContent() {
  const div = useRef(null)

  useEffect(() => {
    const p5 = require('p5')

    const size = 12

    let sketch = new p5((p: any) => {
      let pri = p.loadImage('/imgs/p.jpg')
      let img1 = p.loadImage('/imgs/t1.jpg')
      let img2 = p.loadImage('/imgs/t2.jpg')
      let img3 = p.loadImage('/imgs/t3.jpg')
      let img4 = p.loadImage('/imgs/t4.jpg')
      let img5 = p.loadImage('/imgs/t5.jpg')
      let font = p.loadFont('/libs/font/Lobster-Regular.ttf')

      const shapes: Array<any> = [
        { initial: true, stuck: false, tex: img1 },
        { initial: true, stuck: false, tex: img2 },
        { initial: true, stuck: false, tex: img3 },
        { initial: true, stuck: false, tex: img4 },
        { initial: true, stuck: false, tex: img5 },

        { initial: true, stuck: false, tex: img1 },
        { initial: true, stuck: false, tex: img2 },
        { initial: true, stuck: false, tex: img3 },
        { initial: true, stuck: false, tex: img4 },
        { initial: true, stuck: false, tex: img5 },

        { initial: true, stuck: false, tex: img1 },
        { initial: true, stuck: false, tex: img2 },
        { initial: true, stuck: false, tex: img3 },
        { initial: true, stuck: false, tex: img4 },
        { initial: true, stuck: false, tex: img5 },

        { initial: true, stuck: false, tex: img1 },
        { initial: true, stuck: false, tex: img2 },
        { initial: true, stuck: false, tex: img3 },
        { initial: true, stuck: false, tex: img4 },
        { initial: true, stuck: false, tex: img5 }
      ]

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

      function intersectsBall(ball: any, cubo: any) {
        ball.size = 60

        ball.minX = ball.x - ball.size / 2
        ball.maxX = ball.x + ball.size / 2
        ball.minY = ball.y - ball.size / 2
        ball.maxY = ball.y + ball.size / 2
        cubo.minX = cubo.x - size
        cubo.maxX = cubo.x + size
        cubo.minY = cubo.y - size
        cubo.maxY = cubo.y + size

        return (
          ball.minX <= cubo.maxX &&
          ball.maxX >= cubo.minX &&
          ball.minY <= cubo.maxY &&
          ball.maxY >= cubo.minY
        )
      }

      let num: any = 60
      let mx: any = []
      let my: any = []
      let easing = 0.05
      let ball: any = []
      ball.x = 1
      ball.y = 1
      let contEat = 0

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(
          div.current
        )
      }
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.draw = () => {
        const maxWidth = p.width / 2
        const minWidth = maxWidth * -1

        const maxHight = p.height / 2
        const minHight = maxHight * -1

        p.background(179, 179, 241)

        p.push()
        p.fill(177, 94, 108)
        p.rect(minWidth, minHight, 200, 70)
        p.pop()
        p.noStroke()

        p.push()
        p.textFont(font)
        p.textSize(45)
        p.textAlign(p.CENTER, p.CENTER)
        p.fill(206, 194, 255)
        p.noStroke()
        p.text(contEat, minWidth + 50, minHight + 25)
        p.pop()

        if (p.keyIsDown(p.LEFT_ARROW)) {
          ball.x -= 5
        }

        if (p.keyIsDown(p.RIGHT_ARROW)) {
          ball.x += 5
        }

        if (p.keyIsDown(p.UP_ARROW)) {
          ball.y -= 5
        }

        if (p.keyIsDown(p.DOWN_ARROW)) {
          ball.y += 5
        }

        p.push()
        p.translate(ball.x, ball.y, 0)
        p.texture(pri)
        p.box(60, 60, 60)
        p.pop()

        // p.ambientLight(50)
        // p.directionalLight(255, 0, 0, 0.25, 0.25, 0)
        // p.pointLight(0, 0, 255, locX, locY, 250)

        shapes.forEach((item, index) => {
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
            p.texture(shapes[index].tex)
            p.box(size * 2, size * 2, size * 2)
            p.pop()
          } else {
            if (shapes[index].x > maxWidth) {
              shapes[index].x = minHight
              // shapes[index].cax = shapes[index].cax * -1
            }
            if (shapes[index].x < minWidth) {
              shapes[index].x = maxWidth
              // shapes[index].cax = shapes[index].cax * -1
            }

            shapes[index].x += shapes[index].cax

            if (shapes[index].y > maxHight) {
              shapes[index].y = minHight
              // shapes[index].cay = shapes[index].cay * -1
            }
            if (shapes[index].y < minHight) {
              shapes[index].y = maxHight
              // shapes[index].cay = shapes[index].cay * -1
            }

            shapes[index].y += shapes[index].cay

            for (let shape of shapes) {
              let overlapping = false
              for (let other of shapes) {
                if (intersectsBall(ball, shape)) {
                  contEat++
                  shape.x = p.random(p.width)
                  shape.y = p.random(p.height)
                  shape.cax = Math.random() * 3 * -1
                  shape.cay = Math.random() * 3 * -1
                }
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
            p.texture(shapes[index].tex)
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
