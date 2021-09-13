using Logo.Application.Models.DataContext;
using Logo.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectP511.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        readonly LogoDbContext db;
        public ProductsController(LogoDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [SwaggerOperation("Butun Servislerin siyahisi")]
        public async Task<IActionResult> Get()
        {
            var data = await db.Products.Where(s => s.DeletedDate == null).ToListAsync();
            return Ok(data);
        }

        [HttpGet("{id:int:min(1)}")]
        [SwaggerOperation("Id-ye gore bir service")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await db.Products.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Product model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.CreatedByUserId = 1;//get user id from context
         var product=await  db.Products.AddAsync(model);

            db.SaveChanges();

            return Ok(product);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Edit(int id, Product model)
        {
            if (id != model.Id)
            {
                ModelState.AddModelError("Id", "Entity Key is not same!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await db.Products.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.Name = model.Name;
            entity.SerialNumber = model.SerialNumber;
            entity.Company = model.Company;
            entity.Price = model.Price;
            entity.IsFavourite = model.IsFavourite;
            entity.Material = model.Material;
            entity.Sizes = model.Sizes;
            entity.SubCategoryId = entity.SubCategoryId;
            entity.Description = entity.Description;
            entity.ProductColors= model.ProductColors;


            await db.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpDelete("{id:int:min(1)}")]
        public async Task<IActionResult> Remove(int id)
        {

            var entity = await db.Products.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.DeletedByUserId = 1;
            entity.DeletedDate = DateTime.Now;

            await db.SaveChangesAsync();

            return Ok(entity);
        }
    }
}
