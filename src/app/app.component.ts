import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { Component, ViewChild } from '@angular/core';
import { PointGroup } from 'signature_pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isDrawn = false;
  private history : PointGroup[] = [];
  private future : PointGroup[] = [];

  @ViewChild('signature') 
  public signaturePad! : SignaturePadComponent;
  public signaturePadOptions : NgSignaturePadOptions={
    minWidth:1,
    canvasWidth:500,
    canvasHeight:300,
    penColor:'black',
    backgroundColor:'white',
    dotSize:1,
    maxWidth:1,
    velocityFilterWeight:1
  };

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    console.log(this.signaturePad.toDataURL());
    this.isDrawn = true;
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }

  clear(){
    this.history = [];
    this.future = [];
    this.signaturePad.clear();
  }

  redo(){
    if(this.history.length>=0 && this.future.length >0){
      var data = this.signaturePad.toData();
      if(data || data == undefined){
        const addData : any = this.future.pop();
        data.push(addData);
      }
      this.signaturePad.fromData(data);
    }
  }

  undo(){
    var data = this.signaturePad.toData();
      if(data || data == undefined){
        const lastStrok : any = this.history.pop();
        const removedStrok : any = data.pop();
        this.future.push(removedStrok);
        this.signaturePad.fromData(data);
      }
  }

  SavePNG(){
    if(this.signaturePad.isEmpty()){
      return alert('Please provide a signature');
    }
    const data = this.signaturePad.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = 'signature.png';
    link.click();
  }

  SaveJPEG(){
    if(this.signaturePad.isEmpty()){
      return alert('Please provide a signature');
    }
    const data = this.signaturePad.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.download = 'signature.jpeg';
    link.click();
  }

  SaveSVG(){
    if(this.signaturePad.isEmpty()){
      return alert('Please provide a signature');
    }
    const data = this.signaturePad.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.href = data;
    link.download = 'signature.svg';
    link.click();
  }
}
