# Flocking Simulation

A simulation of flocking behavior inspired by the Boids algorithm. This project visualizes the collective motion of agents (“boids”) following simple rules, resulting in complex group movement such as bird flocks or fish schools.

## Performance Optimization

This simulation uses a **static quadtree** for efficient neighbor searching, greatly improving performance, especially with a large number of boids.

## How It Works

- **Separation:** Boids avoid crowding neighbors.
- **Alignment:** Boids match the heading of nearby boids.
- **Cohesion:** Boids move toward the average position of neighbors.
- **Optimization:** A static quadtree partitions the simulation space for efficient neighbor lookups.

## Customization

- Adjust the number of boids or simulation parameters in the code or config file.
- Tune quadtree settings for performance.
- Experiment with rule strengths for different behaviors.

## References

- [Craig Reynolds' Boids](https://www.red3d.com/cwr/boids/)
- [Johnny-Five Library](http://johnny-five.io/)
- [Quadtree (Wikipedia)](https://en.wikipedia.org/wiki/Quadtree)

---

*Developed by [Div072](https://github.com/Div072)*
