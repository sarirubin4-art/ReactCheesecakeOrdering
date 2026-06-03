using Microsoft.EntityFrameworkCore;

namespace ReactCheesecakeOrdering.Data;

public class CheesecakeBackendDataContext : DbContext
{
    private readonly string _connectionString;

    public CheesecakeBackendDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    public DbSet<CheesecakeOrder> Orders { get; set; }
}