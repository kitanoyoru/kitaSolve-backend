import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from 'src/entities/Post.entity'
import { CreatePostDTO } from './dto/createPost.dto'
import { User } from 'src/entities/User.entity'
import { UpdatePostDTO } from './dto/updatePost.dto'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepo.find()
  }

  async getPostById(id: number): Promise<Post> {
    const post = this.postRepo.findOne({
      where: { id },
    })

    if (!post)
      throw new NotFoundException(`Post with id: ${id} does not exists.`)

    return post
  }

  async allPostsByUser(author: User): Promise<Post[]> {
    return await this.postRepo.find({
      where: { author: { id: author.id } },
      order: { createdAt: 'DESC' },
    })
  }

  async getPostByIdAndUser(id: number, author: User): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
    })

    if (!post)
      throw new NotFoundException(`Post with id: ${id} does not exists.`)

    if (post.author.id !== author.id)
      throw new ForbiddenException('You dont have access to get this post.')

    return post
  }

  async createPost(newPost: CreatePostDTO): Promise<Post> {
    const post = this.postRepo.create(newPost)

    return await this.postRepo.save(post)
  }

  async removePost(post: Post): Promise<Post> {
    return await this.postRepo.remove(post)
  }

  updatePost(post: Post, updates: UpdatePostDTO): Promise<Post> {
    this.postRepo.merge(post, updates)

    return this.postRepo.save(post)
  }
}
