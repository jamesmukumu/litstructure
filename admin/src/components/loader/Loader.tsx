import { ProgressSpinner } from "primereact/progressspinner";

export function Loader(term:string){
return (
<div>
<ProgressSpinner/>
<p className="p-3 text-bolder text-xl">{term}</p>

</div>
)
}