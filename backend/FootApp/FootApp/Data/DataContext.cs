using System.Data;
using System.Data.Common;
using Dapper;
using Microsoft.Data.SqlClient;

namespace FootApp.Data
{
    public class DataContext: IDisposable
    {
        private readonly SqlConnection _dbConnection;
        public DataContext(IConfiguration config)
        {
            _dbConnection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
            _dbConnection.Open(); 
        }

        public IEnumerable<T> LoadData<T>(string sql)
        {
            Console.WriteLine(sql);
            return _dbConnection.Query<T>(sql);
        }

        public T LoadDataSingle<T>(string sql)
        {
            Console.WriteLine(sql);
            return _dbConnection.QuerySingleOrDefault<T>(sql);
        }

        public bool ExecuteSql(string sql)
        {
            return _dbConnection.Execute(sql) > 0;
        }

        public int ExecuteSqlWithRowCount(string sql)
        {
            return _dbConnection.Execute(sql);
        }

        public bool ExecuteSqlWithParameters(string sql, List<SqlParameter> parameters)
        {
            SqlCommand commandWithParams = new SqlCommand(sql);

            foreach (SqlParameter parameter in parameters)
            {
                commandWithParams.Parameters.Add(parameter);
            }


            commandWithParams.Connection = _dbConnection;

            int rowsAffected = commandWithParams.ExecuteNonQuery();


            return rowsAffected > 0;
        }

        public void Dispose()
        {
            _dbConnection?.Close();  
        }
    }
}
