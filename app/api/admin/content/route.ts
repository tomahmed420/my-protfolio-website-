import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const repo = process.env.GITHUB_REPOSITORY || "tomahmed420/my-protfolio-website-";
const branch = process.env.GITHUB_BRANCH || "main";

async function auth(){
  const store=await cookies();
  return store.get("portfolio_admin")?.value === "authenticated";
}

async function github(path:string, init?:RequestInit){
  const token=process.env.GITHUB_TOKEN;
  if(!token) throw new Error("GITHUB_TOKEN is not configured");
  return fetch("https://api.github.com/repos/"+repo+"/contents/"+path+"?ref="+branch,{
    ...init,
    headers:{
      Authorization:"Bearer "+token,
      Accept:"application/vnd.github+json",
      "X-GitHub-Api-Version":"2022-11-28",
      ...(init?.headers||{})
    },
    cache:"no-store"
  });
}

export async function GET(){
  if(!(await auth())) return NextResponse.json({error:"Unauthorized"},{status:401});
  const res=await github("data/content.json");
  if(!res.ok) return NextResponse.json({error:"Content unavailable"},{status:500});
  const data=await res.json();
  const decoded=Buffer.from(data.content.replace(/\n/g,""),"base64").toString("utf8");
  return new NextResponse(decoded,{headers:{"content-type":"application/json"}});
}

export async function PUT(req:Request){
  if(!(await auth())) return NextResponse.json({error:"Unauthorized"},{status:401});
  let parsed;
  try{ parsed=await req.json(); }catch{return NextResponse.json({error:"Invalid JSON"},{status:400});}
  const current=await github("data/content.json");
  if(!current.ok) return NextResponse.json({error:"Could not read current content"},{status:500});
  const file=await current.json();
  const content=Buffer.from(JSON.stringify(parsed,null,2)+"\n").toString("base64");
  const update=await github("data/content.json",{
    method:"PUT",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({message:"content: update portfolio content",content,sha:file.sha,branch})
  });
  if(!update.ok) return NextResponse.json({error:await update.text()},{status:500});
  return NextResponse.json({ok:true});
}