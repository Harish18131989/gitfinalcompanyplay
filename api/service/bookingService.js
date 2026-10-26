export class BookingService
{

    constructor(apifix)
    { 
        this.apifix=apifix;
    }

    //post method
    async createBooking(bookingData)
    {

        return  this.apifix.post('/booking',{
            data:
            bookingData
        })
    }

    //get method
    async getBooking(bookingId)
    {
        return this.apifix.get(`/booking/${bookingId}`);
    }
    //put  method
async fullUpdate(bookingData,bookingId,token)
    {

        return this.apifix.put(`/booking/${bookingId}`,{headers:{Cookie:`token=${token}`}},{data:bookingData})
    }

    //patch method
    async partialUpdate(bookingData, bookingId, token) {
        return this.apifix.patch(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: bookingData
        });
    }

   
async delete_record(bookingId, token) {
    return this.apifix.delete(`/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });
}



}