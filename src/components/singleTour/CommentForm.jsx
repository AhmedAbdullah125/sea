import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import StarRatingField from './StarRatingField';
import { useContext } from 'react';
import { userContext } from '../../context/UserContext';
import { postToApi } from '../../api/utils/postData';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
const formSchema = z.object({
  comment: z.string().nonempty("هذا الحقل مطلوب").min(3, "يجب أن يكون النص أكثر من 3 حروف"),
  rating: z.number().min(1, 'يجب أن يكون التقييم أكبر من 0')
});
const CommentForm = ({ id }) => {
  const queryClient = useQueryClient();
  const {token }=useContext(userContext)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
      rating: 0,
    },
  });
  const onSubmit = async (data) => {
    const final = { ...data, transportation_and_tours_id: id };
    if (token) {
      const res = await postToApi(`/transport-comment`, final, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 201) {
        toast.success('تم إضافة التعليق بنجاح');
        form.reset();
        queryClient.invalidateQueries(['transportation-tour', id]);
      }
      else {
        toast.error("حدث خطأ في إضافة التعليق");
      }
    } else {
      toast.error('يرجى تسجيل الدخول');
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-body p-6 rounded-[40px] space-y-4">
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold text-main-navy'>اترك تعليق</p>
          {/* Star Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StarRatingField value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage  className='text-xs text-red-500 '/>
              </FormItem>
            )}
          />
        </div>
        <div className='w-full h-[1px] bg-gray-300' />
        {/* Comment Textarea */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className='border-none w-full resize-none bg-transparent placeholder:text-xs placeholder:font-bold ' cols="30" rows="10" placeholder="اكتب هنا.."{...field} />
              </FormControl>
              <FormMessage className='text-xs text-red-500 ' />
            </FormItem>
          )}
        />
        <div className='w-full h-[1px] bg-gray-300' />
        <Button type='submit' className='px-8 py-5 text-sm font-bold rounded-full bg-main-blue text-white hover:bg-main-purple transition-all duration-300'>حفظ الان</Button>
      </form>
    </Form>
  )
}

export default CommentForm
