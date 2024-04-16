class Rect{
    constructor(x,y,id,right,left,up,down,upleft,upright,downleft,downright){
        this.id = id;
        this.x=x;
        this.y=y;
        this.points = [];
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
        this.upleft = upleft;
        this.upright = upright;
        this.downleft = downleft;
        this.downright = downright;
    }
}

class Points{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
class matrix{
    constructor(width,height,number=10){
       
        //this.userData = userData;
        this.squares = [];
        this.height=height;
        this.width =width;
        this.number=number;
    }
    
    build(boids){
        // 10
        const number1 = this.width/10;
        const number2 = this.height/10;
        let id = 0;
        let cordinate_x = 0;
        let ordinate_y = 0;
        for(let i=0;i<10;i++){
            cordinate_x=0;
            ordinate_y = ordinate_y+number2;// y change

            for(let j=0;j<10;j++){
               //here x and y are down-right point of spuare not the center points. remember this!!!!
               cordinate_x = cordinate_x+number1;//x change  
                //code again  
                let right = new Points(0,0);
                let left = new Points(0,0);
                let up = new Points(0,0);
                let down = new Points(0,0);
                let upleft = new Points(0,0);
                let upright = new Points(0,0);
                let downleft = new Points(0,0);
                let downright = new Points(0,0);

                right.x= cordinate_x+number1;
                right.y= ordinate_y;

                left.x = cordinate_x - number1;
                left.y = ordinate_y;

                up.x = cordinate_x;
                up.y = ordinate_y-number2;

                down.x = cordinate_x;
                down.y = ordinate_y + number2;

                upleft.x = cordinate_x-number1;
                upleft.y = ordinate_y -number2;

                upright.x = cordinate_x+number1;
                upright.y = ordinate_y-number2;

                downleft.x = cordinate_x-number1;
                downleft.y = ordinate_y+number2;

                downright.x = cordinate_x+number1;
                downright.y = ordinate_y+number2;

                if(j==0){
                    left.x=-1;
                    left.y=-1;

                    upleft.x=-1;
                    upleft.y=-1;

                    downleft.x = -1;
                    downleft.y = -1;
                }
                if(j==9){
                    right.x=-1;
                    right.y=-1;

                    upright.x =-1;
                    upright.y=-1; 

                    downright.x =-1;
                    downright.y =-1;
                }
                if(i==0){
                    up.x=-1;
                    up.y=-1;

                    upleft.x=-1;
                    upleft.y=-1;
                    
                    upright.x =-1;
                    upright.y=-1; 
                }
                if(i==9){
                    down.x=-1;
                    down.y=-1;

                    downleft.x = -1;
                    downleft.y = -1;

                    downright.x =-1;
                    downright.y =-1;
                }
            
                    
                    let rectengle = new Rect(cordinate_x,ordinate_y,id,right,left,up,down,upleft,upright,downleft,downright);
                    
                    this.squares.push(rectengle);
                   
                    id++;
                  
                    //this.squares[i][j](rectengle);
                   
                //this.squares.push(new Rect(x,y,id,left,right,up,down,upleft,upright,downleft,downright,i,j));
               
            }
           
        }
        
        
        
        let cnt = 0;
        //insert points to matrix
        for(let boid of boids){
          
            for(let i=0;i<100;i++){
                let rec = this.squares[i]; 
                    
                let bool = false;
                bool =  this.check(boid,rec);
                
                if(bool){
                    
                    boid.matrix_id=i;
                   
                    this.squares[i].points.push(boid);
                    boid.matrix_id=i;
                   // console.log(rec.x,rec.y,rec.x-this.height/this.number);
                    cnt++;
                    break;
                    
                  
                }
                  
            }
           
           
        }
       
    }
    check_continue(boids){
        
        
        for(let boid of boids){
            let bool = false;
            let i = boid.matrix_id;
            //console.log(i);
           

            
        
            if(this.check(boid,this.squares[i])){
                bool = true;
                boid.matrix_id = i;
                this.squares[i].points = [];
                this.squares[i].points.push(boid);
            }else{
                if(i+1<100 && this.check(boid,this.squares[i+1])){ //right
                    bool=true;
                    boid.matrix_id = i+1;
                    this.squares[i+1].points = [];
                    this.squares[i+1].points.push(boid);
                    continue;
                    
                }
                if(i-1>=0&& this.check(boid, this.squares[i-1] )){//left
                    bool=true;
                    boid.matrix_id = i-1;
                    this.squares[i-1].points = [];
                    this.squares[i-1].points.push(boid);
                    continue;
                    
                }
                if(i-this.number>=0 && this.check(boid,this.squares[i-this.number])){//up
                    bool=true;
                    boid.matrix_id = i-this.number;
                    this.squares[i-this.number].points = [];
                    this.squares[i-this.number].points.push(boid);
                    continue;
                }
                if(i+this.number<100&& this.check(boid,this.squares[i+this.number])){//down
                    bool=true;
                    boid.matrix_id=i+this.number;
                    this.squares[i+this.number].points = [];
                    this.squares[i+this.number].points.push(boid);
                    continue;
                }
                if(i+this.number-1<100&&this.check(boid,this.squares[i+this.number-1])){//downleft
                    bool=true;
                    boid.matrix_id = i+this.number-1;
                    this.squares[i+this.number-1].points = [];
                    this.squares[i+this.number-1].points.push(boid);
                    continue;
                }
                if(i+this.number+1<100 && this.check(boid, this.squares[i+this.number+1])){//downright
                    bool=true;
                    boid.matrix_id=i+this.number+1;
                    this.squares[i+this.number+1].points = [];
                    this.squares[i+this.number+1].points.push(boid);
                    continue;
                }
                if(i-this.number+1>=0&& this.check(boid, this.squares[i-this.number+1])){//upright
                    bool=true;
                    boid.matrix_id=i-this.number+1;
                    this.squares[i-this.number+1].points = [];
                    this.squares[i-this.number+1].points.push(boid);
                    continue;
                }
                if(i-this.number-1>=0&&this.check(boid, this.squares[i-this.number-1])){//upleft
                    bool=true;
                    boid.matrix_id=i-this.number-1;
                    this.squares[i-this.number-1].points = [];
                    this.squares[i-this.number-1].points.push(boid);
                    continue;
                }
            }
            if(!bool){
                
                let cnt=0;
                for(let square of this.squares){
                    
                  
                    if(cnt==0 && this.check(boid,square)){
                        bool = true;
                        boid.matrix_id = square.id;
                        this.squares[square.id].points = [];
                        this.squares[square.id].points.push(boid);
                        cnt++;
                    }
                    
                }
                if(!bool){
                   // console.log(boid.position.x,boid.position.y,i);
                    
                }
             
                //console.log("problem");
            }
            //
            
        }
        
    }
    check(boid, rec){
        //checking if point is in square or not.
       // console.log(rec.x,this.height/this.number);
      
       //console.log(this.height/this.number);
        if(boid.position.y>=rec.y-70 && boid.position.y<=rec.y){

            if(boid.position.x>rec.x-70 && boid.position.x<=rec.x){
                return true;
            }
        }
        return false;
    }
    
    intersects(rec,boid){
    
     /* let mid_h = 35;
      let mid_w = 35;
      let xDist = Math.abs((rec.x-mid_w) - boid.position.x);
      let yDist = Math.abs((rec.y-mid_h) - boid.position.y);
  
      // radius of the circle
      let r = boid.vision_r;
  
      let w = mid_w;
      let h = mid_h;
  
      let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
      stroke(255,0,0);
      noFill();
      strokeWeight(2);
      line(boid.position.x,boid.position.y,boid.position.x+xDist,boid.position.y);
     // line(boid.position.x,boid.position.y,boid.position.x,boid.position.y+yDist);
      // no intersection
      if (xDist > (r + w) || yDist > (r + h))
        return false;
  
      // intersection within the circle
      if (xDist <= w || yDist <= h)
        return true;
  
      // intersection on the edge of the circle
      return edges <= boid.rSquared;
      */
     let circleX = boid.position.x;
     let circleY = boid.position.y;
     let circleRadius = 50;
     let squareSide = 70;
     let squareX = rec.x-35;
     let squareY = rec.y-35;

      const distance = Math.sqrt(Math.pow(circleX - squareX, 2) + Math.pow(circleY - squareY, 2));
      if (distance > circleRadius + squareSide / Math.sqrt(2)) {
          return false; // Circle and square do not intersect
      } else if (distance < Math.abs(circleRadius - squareSide / Math.sqrt(2))) {
          return true; // Circle is completely inside square, they intersect
      } else if (distance >= Math.sqrt(2) * circleRadius + Math.sqrt(2) * squareSide) {
          return false; // Circle is completely outside square, they do not intersect
      } else if (distance <= Math.sqrt(2) * circleRadius) {
          return true; // Circle is completely inside square, they intersect
      } else {
          return true; // Circle and square intersect
      }
        
    }
    //check for intersection with surrounding and within
    check_interscetion(rec, boid){
        let list=[]; // list containing square as an objects or id whould be great?
        let id = boid.matrix_id;
        if(id>=100||id<0){
            return [];
        }
       
        if(this.intersects(this.squares[id],boid)){
            //console.log("center check");
            list.push(id);//center check
        }
        if(id+1<100 && this.intersects(this.squares[id+1],boid)){
            //console.log(" right check");
            list.push(id+1); // right check
        }
        if(id-1>=0 && this.intersects(this.squares[id-1],boid)){
            //console.log(" left check");
             list.push(id-1); // left check
        }
        if(id-this.number>=0 && this.intersects(this.squares[id-this.number],boid)){
            //console.log(" up check");
            list.push(id-this.number); // up
        }
        if(id+this.number<100 && this.intersects(this.squares[id+this.number],boid)){
            //console.log(" docwn check");
            list.push(id+this.number); // down
        }
        if(id-this.number+1>=0 && this.intersects(this.squares[id-this.number+1],boid)){
            //console.log(" upright check");
            list.push(id-this.number+1); // upright
        }
        if(id-this.number-1>=0 && this.intersects(this.squares[id-this.number-1],boid)){
            //console.log(" upleft check");
            list.push(id-this.number-1); // upleft
        }
        if(id+this.number+1<100 && this.intersects(this.squares[id+this.number+1],boid)){
           // console.log(" downright check");
            list.push(id+this.number+1); // downright
        }
        if(id+this.number-1<100 && this.intersects(this.squares[id+this.number-1],boid)){
            //console.log(" downleft check");
            list.push(id+this.number-1); // downleft
        }
        
        return list;
    }
    return_poits(rec,boid){
        let points = [];
        let list = [];
        list = this.check_interscetion(rec,boid);
        //console.log(list,boid);
        for(let i of list){
            
                //console.log(this.squares[i].points);
                points.push(this.squares[i].points);
            
        }
        //console.log(points);
        return points;
    }
    show(){
        stroke(255);
        
        noFill();
        for(let i=0;i<100;i++){
            strokeWeight(2);
            let rec = this.squares[i];
            point(rec.x, rec.y);
        }
        //rectMode(CENTER);
        
        
    }
}