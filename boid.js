class Boid{
    constructor(){
        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1,2));
        this.acceleration = createVector();
        this.maxForce = 0.3;
        this.maxSpeed = 2;
        this.r = 4;
        this.matrix_id=0;
        this.vision_r = 50;
        this.rSquared = this.vision_r * this.vision_r;
        
    }
    edges(){
        if(this.position.x>width){
            this.position.x=0;
        }else if(this.position.x<0){
            this.position.x = width;
        }
        if(this.position.y>height){
           this.position.y=0;
        }else if(this.position.y<0){
            this.position.y=height;
        }
    }
    align(boids){
        
        let perceptionRadius = 50;
        let steering= createVector();
        let total = 0;
        if(boids.length>0){
            for(let other of boids){
                
                if(other.position.x!=0 && other.position.y!=0){
                    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
                    if(other != this && d < perceptionRadius){
                     
                        steering.add(other.velocity);
                        total++;
                    }
                }
               
               
            }
        
       
        if(total>0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);   
            steering.limit(this.maxForce);
        }
       

        }
        
          
        return steering;
    }
    cohesion(boids){
        let perceptionRadius = 50;
        let steering= createVector();
        let total = 0;
        if(boids.length>0){
            for(let other of boids){
                let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
                if(other != this && d < perceptionRadius){
                    steering.add(other.position);
                    total++;
                }
               
            }
            if(total>0){
                steering.div(total);
                steering.sub(this.position);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);   
                steering.limit(this.maxForce);
            }
        }
       
       
        return steering;
    }
    seperation(boids){
        let perceptionRadius =50;
        let steering= createVector();
        let total = 0;
        if(boids.length>0){
            for(let other of boids){
                let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
                if(other != this && d < perceptionRadius){
                    let diff = p5.Vector.sub(this.position,other.position);
                    diff.div(d);
                    steering.add(diff);
                    total++;
                }
            }
            if(total>0){
                steering.div(total);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);   
                steering.limit(this.maxForce);
            }
        }
      
       
        return steering;
    }
    flock(boids){
        let alignment = this.align(boids);
        //this.acceleration.x = alignment.x;
        //this.acceleration.y = alignment.y;
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
    }
    update(){
        
      /*  if(this.position.x>=width||this.position.x<=-width){
            this.velocity.x = -3*this.velocity.x;
        }
        if(this.position.y>=height||this.position.y<=-height){
            this.velocity.y = -3*this.velocity.y;
       }*/
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration); 
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
       
        //console.log(this.velocity);
    }
    show(){
        strokeWeight(6);
        stroke(200);
        point(this.position.x, this.position.y);
    }
}