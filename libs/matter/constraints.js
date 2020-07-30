import Matter from 'matter-js'

export default (el, options) => {
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Runner = Matter.Runner
  const Constraint = Matter.Constraint
  const MouseConstraint = Matter.MouseConstraint
  const Mouse = Matter.Mouse
  const World = Matter.World
  const Bodies = Matter.Bodies

  // create engine
  const engine = Engine.create()
  const world = engine.world

  // create renderer
  const render = Render.create({
    element: el,
    engine,
    options: {
      width: options.width || 800,
      height: options.height || 600,
      wireframeBackground: 'transparent', // 线框模式时背景色
      showAngleIndicator: false
    }
  })

  Render.run(render)

  // create runner
  const runner = Runner.create()
  Runner.run(runner, engine)

  // add stiff global constraint
  let body = Bodies.polygon(150, 200, 5, 30)

  let constraint = Constraint.create({
    pointA: { x: 150, y: 100 },
    bodyB: body,
    pointB: { x: -10, y: -10 }
  })

  World.add(world, [body, constraint])

  // add soft global constraint
  body = Bodies.polygon(280, 100, 3, 30)

  constraint = Constraint.create({
    pointA: { x: 280, y: 120 },
    bodyB: body,
    pointB: { x: -10, y: -7 },
    stiffness: 0.001
  })

  World.add(world, [body, constraint])

  // add damped soft global constraint
  body = Bodies.polygon(400, 100, 4, 30)

  constraint = Constraint.create({
    pointA: { x: 400, y: 120 },
    bodyB: body,
    pointB: { x: -10, y: -10 },
    stiffness: 0.001,
    damping: 0.05
  })

  World.add(world, [body, constraint])

  // add revolute constraint
  body = Bodies.rectangle(600, 200, 200, 20)
  let ball = Bodies.circle(550, 150, 20)

  constraint = Constraint.create({
    pointA: { x: 600, y: 200 },
    bodyB: body,
    length: 0
  })

  World.add(world, [body, ball, constraint])

  // add revolute multi-body constraint
  body = Bodies.rectangle(500, 400, 100, 20, { collisionFilter: { group: -1 } })
  ball = Bodies.circle(600, 400, 20, { collisionFilter: { group: -1 } })

  constraint = Constraint.create({
    bodyA: body,
    bodyB: ball
  })

  World.add(world, [body, ball, constraint])

  // add stiff multi-body constraint
  let bodyA = Bodies.polygon(100, 400, 6, 20)
  let bodyB = Bodies.polygon(200, 400, 1, 50)

  constraint = Constraint.create({
    bodyA,
    pointA: { x: -10, y: -10 },
    bodyB,
    pointB: { x: -10, y: -10 }
  })

  World.add(world, [bodyA, bodyB, constraint])

  // add soft global constraint
  bodyA = Bodies.polygon(300, 400, 4, 20)
  bodyB = Bodies.polygon(400, 400, 3, 30)

  constraint = Constraint.create({
    bodyA,
    pointA: { x: -10, y: -10 },
    bodyB,
    pointB: { x: -10, y: -7 },
    stiffness: 0.001
  })

  World.add(world, [bodyA, bodyB, constraint])

  // add damped soft global constraint
  bodyA = Bodies.polygon(500, 400, 6, 30)
  bodyB = Bodies.polygon(600, 400, 7, 60)

  constraint = Constraint.create({
    bodyA,
    pointA: { x: -10, y: -10 },
    bodyB,
    pointB: { x: -10, y: -10 },
    stiffness: 0.001,
    damping: 0.1
  })

  World.add(world, [bodyA, bodyB, constraint])

  World.add(world, [
    // walls
    // Bodies.rectangle(400, 0, options.width, 50, { isStatic: true }),
    Bodies.rectangle(0, 600, options.width || 800, 50, { isStatic: true }),
    Bodies.rectangle(options.width - 50, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
  ])

  // add mouse control
  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      // allow bodies on mouse to rotate
      angularStiffness: 0,
      render: {
        visible: false
      }
    }
  })

  World.add(world, mouseConstraint)

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
  })

  // context for MatterTools.Demo
  return {
    engine,
    runner,
    render,
    canvas: render.canvas,
    stop() {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
    }
  }
}
