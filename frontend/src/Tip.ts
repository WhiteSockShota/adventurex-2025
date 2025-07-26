import { TYPE, useToast } from "vue-toastification"

export default class Tip{
    title:string
    content:string
  
    constructor(title:string,content:string){
      this.title=title
      this.content=content
    }

    show(){
        let toast = useToast()
        toast(this.content,{
            type:TYPE.INFO,
            timeout:false,
            closeButton:false,
            toastClassName:'bg-black border border-white',
            bodyClassName:'bg-black',
        })
    }
}