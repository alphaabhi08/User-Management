using Backend_Dashboard.Core.Constants;
using Backend_Dashboard.Core.Dtos.Message;
using Backend_Dashboard.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Backend_Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        //Route -> Create a new message to send to another user
        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateNewMessage([FromBody] CreateMessageDto createMessageDto)
        {
            var result = await _messageService.CreateNewMessageAsync(User, createMessageDto);
            if (result.IsSucceed)
                return Ok(result.Message);

            return StatusCode(result.StatusCode, result.Message);
        }

        //Route -> Get All Messages for current user, Either Sender or as Receiver
        [HttpGet]
        [Route("mine")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMyMessage()
        {
            var messages = await _messageService.GetMyMessageAsync(User);
            return Ok(messages);
        }

        //Route -> Get all messages With Owner access and Admin access
        [HttpGet]
        [Authorize(Roles = StaticUserRoles.OwnerAdmin)]

        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMessages()
        {
            var messages = await _messageService.GetMessageAsync();
            return Ok(messages);
        }

        //Route -> Delete Particular Message with it's ID
        [HttpDelete]
        [Route("delete/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteMessage(long id)
        {
            var result = await _messageService.DeleteMessageAsync(id, User);
            if(result.IsSucceed) 
                return Ok(result.Message);
            
            return StatusCode(result.StatusCode, result.Message);
        }                
    }
}
