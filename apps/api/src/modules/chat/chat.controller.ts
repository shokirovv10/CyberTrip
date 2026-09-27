import { Controller, Get, Post, Body, Param, Sse, UseGuards } from '@nestjs/common';
import { ChatService, ChatMessageDto } from './chat.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Observable } from 'rxjs';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms/:roomId/messages')
  @Public()
  getMessages(@Param('roomId') roomId: string) {
    return this.chatService.getMessages(roomId);
  }

  @Post('rooms/:roomId/messages')
  postMessage(
    @Param('roomId') roomId: string,
    @CurrentUser() user: any,
    @Body() body: { content: string; teamName?: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    const username = user?.username || 'CyberStudent';
    return this.chatService.postMessage(roomId, userId, username, body.content, body.teamName);
  }

  @Get('teams/:teamSlug/messages')
  getTeamMessages(@Param('teamSlug') teamSlug: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.chatService.getTeamMessages(teamSlug, userId);
  }

  @Post('teams/:teamSlug/messages')
  postTeamMessage(
    @Param('teamSlug') teamSlug: string,
    @CurrentUser() user: any,
    @Body() body: { content: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    const username = user?.username || 'CyberStudent';
    return this.chatService.postTeamMessage(teamSlug, userId, username, body.content);
  }

  @Sse('rooms/:roomId/stream')
  @Public()
  streamMessages(@Param('roomId') roomId: string): Observable<{ data: ChatMessageDto }> {
    return this.chatService.getMessageStream(roomId);
  }

  @Post('messages/:id/report')
  reportMessage(
    @Param('id') messageId: string,
    @CurrentUser() user: any,
    @Body() body: { reason: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.chatService.reportMessage(messageId, userId, body.reason);
  }
}
