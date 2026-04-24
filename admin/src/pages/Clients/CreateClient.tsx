import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { SaveClient } from "../../services/client";

import { Toast } from "primereact/toast";
import JoditEditor from "jodit-react";

export default function CreateClient() {

const toastRef = useRef(null);
const editor = useRef(null);

const contactPersons = [
"Manager","HR Manager","IT Specialist","Other"
];

const runtimes = [
"PHP (Laravel)",
"PHP (Codeigniter)",
"Node JS",
"Golang",
"Spring Boot",
"Other"
];

/* ---------------- VALIDATION ---------------- */

const schema = Yup.object({

name:Yup.string().required("Client name required"),

email:Yup.string()
.email("Invalid email")
.required("Email required"),

phonenumber:Yup.string()
.required("Phone required"),

contactIndividual:Yup.string()
.required("Contact person required"),

description:Yup.string()
.required("Description required"),

image:Yup.mixed().required("Logo required"),

domain:Yup.string().when("hasHosting",{
is:true,
then:s=>s.required("Domain required")
}),

domainExpiry:Yup.string().when(
["hasHosting","domainExpired"],
{
is:(hosting,expired)=>hosting && expired,
then:s=>s.required("Expiry date required")
}
),

systemMode:Yup.string().when("hasSystem",{
is:true,
then:s=>s.required("System mode required")
}),

});



const formik = useFormik({

initialValues:{
name:"",
email:"",
phonenumber:"",
contactIndividual:"",
description:"",
logo:null,

hasHosting:true,
domain:"",
domainActive:true,
domainExpired:false,
domainExpiry:"",

hasSystem:false,
systemMode:"",
systemActive:true,
systemByUs:false,
yearManufacture:"",
language:""
},

validationSchema:schema,
validateOnMount:true,

onSubmit: async(values)=>{
console.log(values);
try{
let {message}=await SaveClient(values);
if(message==="Client added successfully"){
toastRef.current?.show({
severity:"success",
detail:message,
sticky:true
});
}else if(message==="Validation failed"){
toastRef.current?.show({
severity:"error",
detail:"Please Ensure You Fill All required Fields",
sticky:true
});
}else{
toastRef.current?.show({
severity:"error",
detail:message,
sticky:true
});
}

}catch(err){
console.error(err);
toastRef.current?.show({
severity:"error",
detail:"Something Went wrong",
sticky:true
});
}
}
});

/* ---------------- HELPERS ---------------- */

const Error = ({name}) =>
formik.touched[name] && formik.errors[name] && (
<p className="text-red-500 text-sm mt-1">
{formik.errors[name]}
</p>
);

const BooleanField = ({name,label}) => (
<div className="space-y-2">
<Label>{label}</Label>

<div className="flex gap-6">
<label className="flex gap-2 items-center">
<input
type="radio"
checked={formik.values[name]===true}
onChange={()=>formik.setFieldValue(name,true)}
/>
Yes
</label>

<label className="flex gap-2 items-center">
<input
type="radio"
checked={formik.values[name]===false}
onChange={()=>formik.setFieldValue(name,false)}
/>
No
</label>
</div>
</div>
);

/* ---------------- UI ---------------- */

return(

<div className="w-full  bg-white shadow-xl rounded-xl p-8">

<Toast ref={toastRef} position="bottom-right"/>

<form onSubmit={formik.handleSubmit} className="space-y-10">

<h2 className="text-2xl font-bold text-center">
Basic Client Information
</h2>

<div>
<Label>Name *</Label>
<Input name="name" value={formik.values.name}
onChange={formik.handleChange}
onBlur={formik.handleBlur}/>
<Error name="name"/>
</div>

<div>
<Label>Email *</Label>
<Input name="email"
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}/>
<Error name="email"/>
</div>

<div>
<Label>Phone Number *</Label>
<Input name="phonenumber"
value={formik.values.phonenumber}
onChange={formik.handleChange}
onBlur={formik.handleBlur}/>
<Error name="phonenumber"/>
</div>

<div>
<Label>Contact Person *</Label>
<select
name="contactIndividual"
value={formik.values.contactIndividual}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
className="w-full border rounded-lg p-2">
<option value="">Select</option>
{contactPersons.map(p=>
<option key={p}>{p}</option>
)}
</select>
<Error name="contactIndividual"/>
</div>

<div>
<Label>Description *</Label>
<JoditEditor
ref={editor}
value={formik.values.description}
onBlur={()=>formik.setFieldTouched("description")}
onChange={(c)=>formik.setFieldValue("description",c)}
/>
<Error name="description"/>
</div>

{/* HOSTING */}

<h2 className="text-2xl font-bold text-center">
Hosting Information
</h2>

<BooleanField
name="hasHosting"
label="Is Hosting Available?"
/>

{formik.values.hasHosting && (
<div className="border rounded-lg p-6 space-y-4">

<div>
<Label>Domain *</Label>
<Input name="domain"
value={formik.values.domain}
onChange={formik.handleChange}
onBlur={formik.handleBlur}/>
<Error name="domain"/>
</div>

<BooleanField
name="domainActive"
label="Is Domain Active?"
/>

<BooleanField
name="domainExpired"
label="Is Domain Expired?"
/>

<div>
<Label>Domain Expiry Date *</Label>
<Input name="domainExpiry"
placeholder="MM/DD/YYYY"
value={formik.values.domainExpiry}
onChange={formik.handleChange}
onBlur={formik.handleBlur}/>
<Error name="domainExpiry"/>
</div>

</div>
)}

{/* SYSTEM */}

<h2 className="text-2xl font-bold text-center">
System Information
</h2>

<BooleanField
name="hasSystem"
label="Does Client Have System?"
/>

{formik.values.hasSystem && (
<div className="border rounded-lg p-6 space-y-4">

<div>
<Label>System Mode *</Label>
<Input name="systemMode"
value={formik.values.systemMode}
onChange={formik.handleChange}
onBlur={formik.handleBlur}/>
<Error name="systemMode"/>
</div>

<BooleanField
name="systemActive"
label="Is System Active?"
/>

<BooleanField
name="systemByUs"
label="System Developed By Us?"
/>

<div>
<Label>Year Manufactured</Label>
<Input name="yearManufacture"
value={formik.values.yearManufacture}
onChange={formik.handleChange}/>
</div>

<div>
<Label>Language Used</Label>
<select
name="language"
value={formik.values.language}
onChange={formik.handleChange}
className="w-full border rounded-lg p-2">
<option value="">Select Runtime</option>
{runtimes.map(r=>
<option key={r}>{r}</option>
)}
</select>
</div>

</div>
)}

{/* LOGO */}

<div>
<Label>Logo *</Label>
<FileInput
name="image"
onChange={(e)=>
formik.setFieldValue(
"image",
e.target.files?.[0] || null
)}
/>
<Error name="image"/>
</div>

<Button
type="submit"
size="sm"
disabled={
!formik.isValid ||
!formik.dirty ||
formik.isSubmitting
}>
{formik.isSubmitting ? "Creating..." : "Create Client"}
</Button>

</form>
</div>
);
}