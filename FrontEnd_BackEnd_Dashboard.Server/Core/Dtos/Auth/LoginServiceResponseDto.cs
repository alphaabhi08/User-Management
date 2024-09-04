namespace Backend_Dashboard.Core.Dtos.Auth
{
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; }
        //This would be return to frond-end
        public UserInfoResult UserInfo { get; set; }
    }
}
