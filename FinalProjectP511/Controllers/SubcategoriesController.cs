using Logo.Application.Models.DataContext;
using Logo.Application.Models.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Subcategories : ControllerBase
    {
        readonly LogoDbContext db;
        public Subcategories(LogoDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [SwaggerOperation("Butun alt kategoriyalarin siyahisi")]
        public async Task<IActionResult> Get()
        {
            var data = await db.SubCategories
                .Where(s => s.DeletedDate == null)
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("{id:int:min(1)}")]
        [SwaggerOperation("Id-ye gore bir alt  kategoriya")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await db.SubCategories
                .FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add([Bind("Name,CategoryId")] SubCategory model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            model.Category = db.Categories.Single(c=>c.Id==model.CategoryId);

            await db.SubCategories.AddAsync(model);


            db.SaveChanges();
            return CreatedAtAction(nameof(Get), new
            {
                id = model.Id

            }, model);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Edit(int id, SubCategory model)
        {
            if (id != model.Id)
            {
                ModelState.AddModelError("Id", "Entity Key is not same!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await db.SubCategories
                .FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.Name = model.Name;
            entity.CategoryId = model.CategoryId;
            entity.Category = model.Category;
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

            var entity = await db.SubCategories
                .FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.DeletedByUserId = 1;
            entity.DeletedDate = DateTime.Now;

            await db.SaveChangesAsync();

            return Ok(entity);
        }
    }

}
