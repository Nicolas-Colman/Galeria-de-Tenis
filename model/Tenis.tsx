export class Tenis {
    public id      : string;
    public modelo  : string;
    public marca   : string;
    public numero  : string;
    public cor     : string;
    public urlfoto : string;

    constructor(obj?: Partial<Tenis>){
        if(obj){
            this.id      = obj.id
            this.modelo  = obj.modelo
            this.marca   = obj.marca 
            this.numero  = obj.numero 
            this.cor     = obj.cor 
            this.urlfoto = obj.urlfoto
        }
    }

    toString(){
        const objeto = `{
            "id"      : "${this.id}",
            "modelo"  : "${this.modelo}",
            "marca"   : "${this.marca}",
            "numero"  : "${this.numero}",
            "cor"     : "${this.cor}",
            "urlfoto"  : "${this.urlfoto}"
        }`
        return objeto
    }

    toFirestore(){
            const tenis = {
                id      : this.id,
                modelo  : this.modelo,
                marca   : this.marca,
                numero  : this.numero,
                cor     : this.cor,
                urlfoto : this.urlfoto
            }

            return tenis
    }
    
}