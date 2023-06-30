using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // GET: api/album
        [HttpGet]
        public IActionResult Get()
        {
            var albums = Album.GetAll();

            return Ok(albums);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var albums = Album.GetAll();
            var album = albums.Find(album => album.Id == id);

            if (album == null)
            {
                return NotFound();
            }

            return Ok(album);
        }

        // function that search album by name, artist or genre
        [HttpGet("search")]
        public IActionResult Search([FromQuery] string q)
        {
            var albums = Album.GetAll();
            var album = albums.Find(album => album.Title.ToLower().Contains(q.ToLower()) || album.Artist.ToLower().Contains(q.ToLower()) || album.Genre.ToLower().Contains(q.ToLower()));

            if (album == null)
            {
                return NotFound();
            }

            return Ok(album);
        }

        // function that sorts albums by name, artist or genre
        [HttpGet("sort")]
        public IActionResult Sort([FromQuery] string q)
        {
            var albums = Album.GetAll();
            switch (q)
            {
                case "title":
                    albums.Sort((x, y) => x.Title.CompareTo(y.Title));
                    break;
                case "artist":
                    albums.Sort((x, y) => x.Artist.CompareTo(y.Artist));
                    break;
                case "genre":
                    albums.Sort((x, y) => x.Genre.CompareTo(y.Genre));
                    break;
                default:
                    return NotFound();
            }

            return Ok(albums);
        }
    }
}
