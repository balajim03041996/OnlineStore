create or alter procedure
sp_TransferMoney 
@FromId int, @ToId int , @Amount int  as 

begin 
begin tran

begin try

select AccountantName, Money from CustomersCopy
where id=@FromId or id= @ToId;

 update CustomersCopy
 set Money -=@Amount where Id= @FromId;
 update CustomersCopy
 set  Money +=@Amount where Id=@ToId;

 select AccountantName, Money from CustomersCopy
where id=@FromId or id= @ToId;
end try

begin catch

select ERROR_MESSAGE() as error
rollback
end catch

end
