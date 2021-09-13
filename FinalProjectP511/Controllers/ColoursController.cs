﻿using Logo.Application.Models.DataContext;
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
    public class ColoursController : ControllerBase
    {
        readonly LogoDbContext db;
        public ColoursController(LogoDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [SwaggerOperation("Butun renglerin siyahisi")]
        public async Task<IActionResult> Get()
        {
            var data = await db.ProductColors.Where(s => s.DeletedDate == null).ToListAsync();
            return Ok(data);
        }

        [HttpGet("{id:int:min(1)}")]
        [SwaggerOperation("Id-ye gore bir reng")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await db.ProductColors.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductColor model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var colour = await db.ProductColors.AddAsync(model);

            db.SaveChanges();

            return CreatedAtAction(nameof(Get), new
            {
                id = model.Id
            }, model);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Edit(int id, ProductColor model)
        {
            if (id != model.Id)
            {
                ModelState.AddModelError("Id", "Entity Key is not same!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await db.ProductColors.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.Name = model.Name;
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

            var entity = await db.ProductColors.FirstOrDefaultAsync(s => s.Id == id && s.DeletedDate == null);

            if (entity == null)
                return NotFound();

            entity.DeletedByUserId = 1;
            entity.DeletedDate = DateTime.Now;

            await db.SaveChangesAsync();

            return Ok(entity);
        }
    }

}
