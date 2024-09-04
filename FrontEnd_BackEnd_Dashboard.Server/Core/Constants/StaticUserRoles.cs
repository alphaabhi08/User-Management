using Microsoft.Identity.Client;

namespace Backend_Dashboard.Core.Constants
{
    // This is class is used to avoid typing errors
    public static class StaticUserRoles
    {
        public const string OWNER = "OWNER";
        public const string ADMIN = "ADMIN";
        public const string MANAGER = "MANAGER";
        public const string USER = "USER";

        public const string OwnerAdmin = "OWNER, ADMIN";
        public const string OwnerAdminManager = "OWNER, ADMIN, MANAGER";
        public const string OwnerAdminManagerUser = "OWNER, ADMIN, MANAGER, USER";
    }
}
