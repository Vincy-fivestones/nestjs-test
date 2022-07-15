import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/auth/entities/bookmark.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getBookmarks(userId: number) {
    // QueryBuilder
    // return this.bookmarkRepository
    //   .createQueryBuilder('bookmark')
    //   .leftJoinAndSelect('bookmark.user', 'user')
    //   .where('user.id = :userId', { userId: userId })
    //   .getMany();

    return this.bookmarkRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    // return this.bookmarkRepository
    //   .createQueryBuilder('bookmark')
    //   .leftJoinAndSelect('bookmark.user', 'user')
    //   .where('user.id = :userId', { userId: userId })
    //   .andWhere('bookmark.id = :id', { id: bookmarkId })
    //   .getOne();

    return this.bookmarkRepository.find({
      relations: {
        user: true,
      },
      where: {
        id: bookmarkId,
        user: {
          id: userId,
        },
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const bookmark = await this.bookmarkRepository.create({
      ...dto,
      user: user,
    });

    return await this.bookmarkRepository.save(bookmark);
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // get the bookmark by id
    const bookmark = await this.bookmarkRepository.findOneBy({
      id: bookmarkId,
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.user.id !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.bookmarkRepository.save({ id: bookmarkId, ...dto });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.bookmarkRepository.findOneBy({
      id: bookmarkId,
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.user.id !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.bookmarkRepository.delete({
      id: bookmarkId,
    });
  }
}
