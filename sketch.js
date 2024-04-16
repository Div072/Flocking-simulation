const flock = [];
let ma;
let cnt=0;

function setup(){
    createCanvas(700,700);
    
    background(51);
    //let boundry = new Rectangle(0,0,width,height);
 
    //console.log(ma.squares);
    
    for(let i=0;i<500;i++){
        flock.push(new Boid);
        //flock[i].position.x=random(140+70,210+70);
        //flock[i].position.y=random(70,70+70);
    }  

    ma = new matrix(700,700);
    
    ma.build(flock); 
    //ma.check_continue(flock);

 
   
    
}

function draw(){
    background(51);
 
   // qtree = new QuadTree(boundry,4);
   /* for(let boid of flock){
        
        points.push(new Point(boid.position.x,boid.position.y,boid));

       // qtree.insert(points);
    }*/
   
    
   // console.log(bool);
    //need to check if all the boids are on the matrix or need to chage and change it
    ma.check_continue(flock);
    //after change it we need to create circle range and write contains and intersects fucntion for it in matrix.js
    for(let boid of flock){
       // let range = new Circle(boid.position.x,boid.position.y,boid.r*2);
        //let points = qtree.query(range);
        let points = [];
        let temp = [];
        
      
      
       // rects = ma.check_interscetion(ma.squares[boid.matrix_id],boid);
        points = ma.return_poits(ma.squares[boid.matrix_id],boid);
        
        for(let p of points){
            if (p.length!=0){
                temp.push(p[0]);
            }    
        }
    
        //console.log(temp[0]);
       // ma.show();
       
        boid.edges();
        boid.flock(temp);
        boid.update();
        boid.show();
        
        
        
       
        
      
     
        
       
      
       
    }
   
    
    
    
}