
using Backend_Dashboard.Core.Dtos.General;
using Backend_Dashboard.Core.Dtos.Message;
using System.Security.Claims;

namespace Backend_Dashboard.Core.Interfaces
{
    public interface IMessageService
    {
        Task<GeneralServiceResponseDto> CreateNewMessageAsync(ClaimsPrincipal User, CreateMessageDto createMessageDto);
        Task<IEnumerable<GetMessageDto>> GetMessageAsync();
        Task<IEnumerable<GetMessageDto>> GetMyMessageAsync(ClaimsPrincipal User);
        Task<GeneralServiceResponseDto> DeleteMessageAsync(long messageId, ClaimsPrincipal User);


    }
}
