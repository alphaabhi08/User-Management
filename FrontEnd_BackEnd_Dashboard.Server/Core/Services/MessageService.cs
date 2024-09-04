using Backend_Dashboard.Core.Constants;
using Backend_Dashboard.Core.DbContext;
using Backend_Dashboard.Core.Dtos.General;
using Backend_Dashboard.Core.Dtos.Message;
using Backend_Dashboard.Core.Entities;
using Backend_Dashboard.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend_Dashboard.Core.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogService _logService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MessageService(ApplicationDbContext context, ILogService logService, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _logService = logService;
            _userManager = userManager;
        }

        public async Task<GeneralServiceResponseDto> CreateNewMessageAsync(ClaimsPrincipal User, CreateMessageDto createMessageDto)
        {
            if (User.Identity.Name == createMessageDto.ReceiverUserName)

                return new GeneralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Sender and Receiver can not be same"
                };

            var isReceiverUserNameValid = _userManager.Users.Any(q => q.UserName == createMessageDto.ReceiverUserName);
            if (!isReceiverUserNameValid)
                return new GeneralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Receiver UserName is not valid"
                };
            Message newMessage = new Message()
            {
                SenderUserName = User.Identity.Name,
                ReceiverUserName = createMessageDto.ReceiverUserName,
                Text = createMessageDto.Text
            };
            await _context.Messages.AddAsync(newMessage);
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(User.Identity.Name, "Send Message");

            return new GeneralServiceResponseDto()
            {
                IsSucceed = true,
                StatusCode = 201,
                Message = "Message saved succesfully"
            };
        }        

        public async Task<IEnumerable<GetMessageDto>> GetMessageAsync()
        {
            var messages = await _context.Messages
                .Select(q => new GetMessageDto()
                {
                    Id = q.Id,
                    SenderUserName = q.SenderUserName,
                    ReceiverUserName = q.ReceiverUserName,
                    Text = q.Text,
                    CreatedAt = q.CreatedAt
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<GetMessageDto>> GetMyMessageAsync(ClaimsPrincipal User)
        {
            var loggedInUser = User.Identity.Name;

            var message = await _context.Messages
                .Where(q => q.SenderUserName == loggedInUser || q.ReceiverUserName == loggedInUser)
                .Select(q => new GetMessageDto()
                {
                    Id = q.Id,
                    SenderUserName = q.SenderUserName,
                    ReceiverUserName = q.ReceiverUserName,
                    Text = q.Text,
                    CreatedAt = q.CreatedAt,
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
            return message;
        }

        public async Task<GeneralServiceResponseDto> DeleteMessageAsync(long messageId, ClaimsPrincipal User)
        {
            var message = await _context.Messages.FindAsync(messageId);

            if(message == null)
            {
                return new GeneralServiceResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = "Message Not Found"
                };
            }
            // Check if the user is the sender or receiver of the messages
            //var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (message.UserId != userId && !user.IsInRole(StaticUserRoles.Admin))

                var loggedInUser = User.Identity.Name;
            if (message.SenderUserName != loggedInUser && message.ReceiverUserName != loggedInUser)
            {
                return new GeneralServiceResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 403,
                    Message = "You do not have permission to delete this message"
                };
            }

            //Remove message from the Database
            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            //Log the deletion
            await _logService.SaveNewLog(loggedInUser, "Deleted Message");

            return new GeneralServiceResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "Message Deleted Successfully"
            };
        }
    }
}
