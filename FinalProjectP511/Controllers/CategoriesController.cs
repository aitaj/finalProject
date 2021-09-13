
using Logo.Application;
using Logo.Application.Models.DataContext;
using Logo.Application.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Logo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        readonly LogoDbContext db;
        public CategoriesController(LogoDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [SwaggerOperation("Butun kategoriyalarin siyahisi")]
        public async Task<IActionResult> Get()
        {
            var data = await db.Categories.Where(s => s.DeletedDate == null).ToListAsync();
            return Ok(data);
        }

        [HttpGet("{id:int:min(1)}")]
        [SwaggerOperation("Id-ye gore bir kategoriya")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await db.Categories.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.CreatedByUserId = 1;//get user id from context
            var category = await db.Categories.AddAsync(model);

            db.SaveChanges();

            return CreatedAtAction(nameof(Get), new
            {
                id = model.Id
            }, model);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Edit(int id, Category model)
        {
            if (id != model.Id)
            {
                ModelState.AddModelError("Id", "Entity Key is not same!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await db.Categories.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.Name = model.Name;


            await db.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpDelete("{id:int:min(1)}")]
        public async Task<IActionResult> Remove(int id)
        {

            var entity = await db.Categories.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.DeletedByUserId = 1;
            entity.DeletedDate = DateTime.Now;

            await db.SaveChangesAsync();

            return Ok(entity);
        }
    }

}
