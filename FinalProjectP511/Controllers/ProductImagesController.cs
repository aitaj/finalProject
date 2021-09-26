﻿using Logo.Application.Models.DataContext;
using Logo.Application.Models.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Logo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductImagesController : ControllerBase
    {
        readonly LogoDbContext db;
        private readonly IWebHostEnvironment iWebHostEnvironment;
        public ProductImagesController(LogoDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [SwaggerOperation("Butun locationlarin siyahisi")]
        public async Task<IActionResult> Get()
        {
            var data = await db.ProductImages.Where(s => s.DeletedDate == null).ToListAsync();
            foreach (var item in data)
            {
                item.Product = db.Products.FirstOrDefault(p => p.Id == item.ProductId);
            }
            return Ok(data);
        }

        [HttpGet("{id:int:min(1)}")]
        [SwaggerOperation("Id-ye gore bir shekil")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await db.ProductImages.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);
            data.Product = await db.Products.FirstOrDefaultAsync(p => p.Id == data.ProductId);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductImage model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

          

            await db.ProductImages.AddAsync(model);
            db.SaveChanges();
            return CreatedAtAction(nameof(Get), new
            {
                id = model.Id
            }, model);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Edit(int id, ProductImage model)
        {
            if (id != model.Id)
            {
                ModelState.AddModelError("Id", "Entity Key is not same!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await db.ProductImages.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();
            model.Product = await db.Products.FirstOrDefaultAsync(p => p.Id == model.ProductId);
            entity.ImagePath = model.ImagePath;
            entity.Name = model.Name;
            entity.Product = model.Product;
            entity.CreatedByUserId = model.CreatedByUserId;
            entity.CreatedDate = model.CreatedDate;
            entity.DeletedDate = model.DeletedDate;
            entity.DeletedByUserId = model.DeletedByUserId;

            await db.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpDelete("{id:int:min(1)}")]
        public async Task<IActionResult> Remove(int id)
        {

            var entity = await db.ProductImages.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();
            DeleteImage(entity.Name);
            entity.DeletedByUserId = 1;
            entity.DeletedDate = DateTime.Now;

            await db.SaveChangesAsync();

            return Ok(entity);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(iWebHostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        [NonAction]
        public async Task<string> DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(iWebHostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
            return imageName;
        }
    }
}
