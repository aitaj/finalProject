

using Logo.Application.Helpers.Services;
using Logo.Application.Models.DataContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProjectP511
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Logo API", Version = "v1" });

                c.EnableAnnotations();
            });

            services.AddControllers().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<LogoDbContext>(cfg => {
                cfg.UseSqlServer(Configuration.GetConnectionString("cString"));
            });

            services.AddIdentity<LogoUser, IdentityRole>().AddEntityFrameworkStores<LogoDbContext>().AddDefaultTokenProviders();
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme= JwtBearerDefaults.AuthenticationScheme;
            }
            
            ).AddJwtBearer(
                options => { 
                options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience=true,
                        ValidAudience=Configuration["JWT:ValidAudience"],
                        ValidIssuer= Configuration["JWT:ValidIssuer"],
                        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                    };
            }); 
            services.AddCors();
            services.AddScoped<JWTService>();
         
        }

         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
       
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseCors(x => x.WithOrigins(new[] { "http://localhost:3000" })
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials());

            app.UseHttpsRedirection(); 


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.Seed();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
