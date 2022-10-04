package com.anuj.joshi.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import com.anuj.joshi.hr.dl.*;
import java.util.*;
import com.google.gson.*;
public class ServletThree extends HttpServlet
{
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
try
{
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}catch(Exception e)
{
//do nothing
}
}
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{
BufferedReader br=request.getReader();
StringBuffer b=new StringBuffer();//read string buffer ans string builder from google
String d;
while(true)
{
d=br.readLine();
if(d==null) break;
b.append(d);
}
String rawData=b.toString();
Gson gson=new Gson();
Customer c=gson.fromJson(rawData,Customer.class);//refection api customer class
PrintWriter pw=response.getWriter();
response.setContentType("application/json");
pw.print(gson.toJson(c));
pw.flush();
}catch(Exception exception)
{
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(Exception ee)
{
//
}
}
}
}