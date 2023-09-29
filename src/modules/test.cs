#r "Newtonsoft.Json"

using System.IO;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    // Extract the token from the request header
    if (!req.Headers.TryGetValue("Authorization", out StringValues authHeader) || string.IsNullOrEmpty(authHeader.ToString()))
    {
        return new UnauthorizedResult(); // No authorization header found
    }

    var token = authHeader.ToString().Replace("Bearer ", ""); // remove the "Bearer" prefix

    // Token verification
    var key = Encoding.ASCII.GetBytes("saippuakauppiassaippuakauppiassaippuakauppiassaippuakauppias");
    var tokenHandler = new JwtSecurityTokenHandler();
    var validationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };

    try
    {
        tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
    }
    catch
    {
        return new UnauthorizedResult();  // Token verification failed
    }

    var connectionString = Environment.GetEnvironmentVariable("SQLConnectionString"); 

    using (SqlConnection conn = new SqlConnection(connectionString))
    {
        conn.Open();

        // Parse the request body to determine action
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);
        string messageText = data?.text;
        string authorName = data?.author;


        if (!string.IsNullOrEmpty(messageText))
        {
            // If message is provided, insert it into the database
            var insertQuery = "INSERT INTO HeippaLappu (Viesti, Author) VALUES (@Viesti, @Author)";

            using (SqlCommand cmd = new SqlCommand(insertQuery, conn))
            {
                cmd.Parameters.AddWithValue("@Viesti", messageText);
                cmd.Parameters.AddWithValue("@Author", authorName);
            
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                if (rowsAffected > 0)
                {
                    return new OkResult();
                }
                else
                {
                    return new BadRequestObjectResult("Error inserting message into the database.");

                }
            }
        }
        else
        {
            // If no message provided, fetch all messages from the database
            var selectQuery = "SELECT * FROM HeippaLappu";
            using (SqlCommand cmd = new SqlCommand(selectQuery, conn))
            {
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                List<object> messages = new List<object>();
                while (reader.Read())
                {
                    // Retrieve the UTC date from the database
DateTime utcDate = Convert.ToDateTime(reader["Pvm"]);

// Convert the UTC date to Helsinki time
TimeZoneInfo helsinkiZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Helsinki");
DateTime helsinkiDate = TimeZoneInfo.ConvertTimeFromUtc(utcDate, helsinkiZone);

// Create the message object
var message = new 
{
    text = reader["Viesti"].ToString(),
    author = reader["Author"].ToString(),
    date = helsinkiDate.ToString("dd.MM.yyyy HH:mm")
};
                
                    messages.Add(message);
                }

                return new OkObjectResult(JsonConvert.SerializeObject(messages));
            }
        }
    }
}
